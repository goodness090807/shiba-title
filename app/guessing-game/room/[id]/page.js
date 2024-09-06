"use client";

import FunctionButton from "@/components/FunctionButton";
import LinkButton from "@/components/LinkButton";
import useWebSocket from "react-use-websocket";
import { MdIosShare, MdOutlineKeyboardReturn } from "react-icons/md";
import Loading from "@/components/Loading";
import { useRoomInfo } from "@/hooks/guessing-game-hooks";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Cards from "../components/Cards";
import RoomLoading from "../components/RoomLoading";
import RoomHeader from "../components/RoomHeader";

Room.propTypes = {
    params: PropTypes.object,
};

export default function Room({ params }) {
    const { loading, roomInfo, error } = useRoomInfo(params.id);
    const [room, setRoom] = useState(roomInfo);
    const [status, setStatus] = useState("waiting");
    const [user, setUser] = useState(null);
    const router = useRouter();
    const userNameRef = useRef("");

    const { sendMessage, lastMessage } = useWebSocket(`${process.env.NEXT_PUBLIC_WEB_SOCKET_PATH}/ws`, {
        shouldReconnect: (_) => true,
    });

    const handleClickSendMessage = (e) => {
        e.preventDefault();

        if (!userNameRef.current.value) {
            alert("請輸入您的名稱");
            return;
        }

        sendMessage(
            JSON.stringify({
                id: params.id,
                userName: userNameRef.current.value,
            })
        );

        setUser(userNameRef.current.value);
    };

    useEffect(() => {
        if (lastMessage !== null) {
            setStatus("entering");
            setRoom(JSON.parse(lastMessage.data));
            setStatus("entered");
        }
    }, [lastMessage]);

    if (loading) {
        return <RoomLoading>讀取中</RoomLoading>;
    }

    if (error) {
        return (
            <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-3">
                <span className="font-bold text-yellow-600 text-xl mx-3">{error}</span>
                <LinkButton href="/">返回</LinkButton>
            </main>
        );
    }

    if (status === "waiting" && user == null) {
        return (
            <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5">
                <form onSubmit={handleClickSendMessage} className="w-4/5 flex justify-center">
                    <input ref={userNameRef} placeholder="請輸入您的名稱" className="rounded-lg py-3 px-5 text-xl w-80" />
                </form>

                <FunctionButton onClick={handleClickSendMessage}>進入房間</FunctionButton>

                <LinkButton href="/guessing-game/start">返回</LinkButton>
            </main>
        );
    }

    if (status === "entering" || room == null) {
        return <RoomLoading>進入房間中</RoomLoading>;
    }

    return (
        <main className="w-full flex flex-col items-center gap-5 mb-5">
            <RoomHeader room={room} />
            <Cards withoutSelfUsers={room.withoutSelfUsers} />
        </main>
    );
}
