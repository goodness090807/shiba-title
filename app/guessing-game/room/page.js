"use client";

import FunctionButton from "@/components/FunctionButton";
import LinkButton from "@/components/LinkButton";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import { MdIosShare, MdOutlineKeyboardReturn } from "react-icons/md";
import Loading from "@/components/Loading";

export default function Room() {
    const MainPage = () => {
        const searchParams = useSearchParams();
        const id = searchParams.get("id");
        const router = useRouter();
        const [user, setUser] = useState(null);
        const [roomInfo, setRoomInfo] = useState(null);
        const [canEnter, setCanEnter] = useState(null);
        const userRef = useRef("");

        const { sendMessage, lastMessage } = useWebSocket(`${process.env.NEXT_PUBLIC_WEB_SOCKET_PATH}/ws`, {
            shouldReconnect: (_) => true,
        });

        useEffect(() => {
            if (lastMessage !== null) {
                const obj = JSON.parse(lastMessage.data);
                setRoomInfo(obj);
            }
        }, [lastMessage]);

        useEffect(() => {
            const getRoomInfo = async () => {
                try {
                    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_PATH}/room/${id}`);

                    setCanEnter(true);
                    setRoomInfo(response.data);
                } catch (error) {
                    if (error.response) {
                        if (error.response.status == 404 || error.response.status == 400) {
                            setCanEnter(false);
                        }
                    }
                }
            };
            getRoomInfo();
        }, [id]);

        const handleClickSendMessage = useCallback(
            (e) => {
                e.preventDefault();

                if (!userRef.current.value) {
                    alert("請輸入您的名稱");
                    return;
                }

                sendMessage(
                    JSON.stringify({
                        id: id,
                        userName: userRef.current.value,
                    })
                );

                setUser(userRef.current.value);
            },
            [id]
        );

        const handlerShareClick = async () => {
            const shareData = {
                title: "柴題遊戲",
                text: "您的好友邀請您一起參與柴題遊戲，點擊加入我們一起玩耍吧!!!",
                url: `/guessing-game/room?id=${id}`,
            };
            await navigator.share(shareData);
        };

        const cards = roomInfo?.users.map((user) => {
            return (
                <li key={user.socketId} className="flex flex-col gap-3">
                    <div className="relative flex justify-center items-center flex-col h-40 w-32 bg-white rounded-xl shadow-[11px_10px_5px_0px_#A09B95]">
                        <Image className="max-w-full px-3" src={user.questionUrl} width={240} height={320} alt="猜題圖片" />
                        <span className="text-xl font-bold text-gray-600">{user.questionTitle}</span>
                    </div>
                    <span className="text-xl flex justify-center font-bold text-yellow-800">{user.userName}</span>
                </li>
            );
        });

        if (canEnter == null && roomInfo == null) {
            return (
                <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <span className="font-bold text-yellow-600 text-xl mx-3">讀取中</span>
                    <Loading />
                </main>
            );
        }

        if (!canEnter) {
            return (
                <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-3">
                    <span className="font-bold text-yellow-600 text-xl mx-3">找不到房間!!!</span>
                    <LinkButton href="/">返回</LinkButton>
                </main>
            );
        }

        if (canEnter && roomInfo.currentUser > roomInfo.maxUser) {
            return (
                <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-3">
                    <span className="text-xl text-yellow-600 font-bold">人數已滿!!!</span>
                    <LinkButton href="/">返回</LinkButton>
                </main>
            );
        }

        if (canEnter && !user) {
            return (
                <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5">
                    <form onSubmit={handleClickSendMessage} className="w-4/5 flex justify-center">
                        <input ref={userRef} placeholder="請輸入您的名稱" className="rounded-lg py-3 px-5 text-xl w-80" />
                    </form>

                    <FunctionButton onClick={handleClickSendMessage}>進入房間</FunctionButton>

                    <LinkButton href="/guessing-game/start">返回</LinkButton>
                </main>
            );
        }

        return (
            <main className="w-full flex flex-col items-center gap-5 mb-5">
                <span className="font-bold text-yellow-600 text-xl">分享連結給朋友一起遊玩吧</span>
                <div className="flex items-center justify-center gap-2">
                    <span className="font-bold text-yellow-800 text-md w-52 text-center">
                        目前人數：{roomInfo.currentUser}/{roomInfo.maxUser}
                    </span>
                    <button
                        title="分享連結"
                        onClick={handlerShareClick}
                        className="flex justify-center items-center p-3 bg-white border-2 rounded-md border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 transition-all"
                    >
                        <MdIosShare className="text-2xl" />
                    </button>
                    <button
                        title="返回"
                        className="flex justify-center items-center p-3 bg-white border-2 rounded-md border-yellow-600 text-yellow-600 hover:bg-yellow-600/10 transition-all"
                        onClick={() => router.push("/guessing-game/start", { scroll: false })}
                    >
                        <MdOutlineKeyboardReturn className="text-2xl" />
                    </button>
                </div>
                <ul className="flex flex-wrap gap-5 justify-center w-4/5">
                    <li className="flex flex-col gap-3">
                        <div className="flex items-center justify-center h-40 w-32 px-1 rounded-xl border-4 border-[#a7844c] bg-[#fffeef] shadow-[11px_10px_5px_0px_#A09B95]">
                            <Image src={"/card-back.png"} alt="柴犬背卡" height={320} width={240} />
                        </div>
                        <span className="text-xl flex justify-center font-bold text-yellow-800">你的牌(不能看)</span>
                    </li>
                    {cards}
                </ul>
            </main>
        );
    };

    return (
        <Suspense>
            <MainPage />
        </Suspense>
    );
}
