"use client";

import FunctionButton from "@/components/FunctionButton";
import LinkButton from "@/components/LinkButton";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import { MdIosShare, MdOutlineKeyboardReturn } from "react-icons/md";
import Loading from "@/components/Loading";

export default function Room() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const id = searchParams.get("id");
	const [user, setUser] = useState(null);
	const [roomInfo, setRoomInfo] = useState(null);
	const [canEnter, setCanEnter] = useState(null);
	const userRef = useRef("");

	const getRoomInfo = async () => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_PATH}/room/${id}`
			);

			setCanEnter(true);
			setRoomInfo(response.data);
		} catch (error) {
			if (error.response) {
				if (
					error.response.status == 404 ||
					error.response.status == 400
				) {
					setCanEnter(false);
				}
			}
		}
	};

	const { sendMessage, lastMessage } = useWebSocket(
		`${process.env.NEXT_PUBLIC_WEB_SOCKET_PATH}/ws`,
		{
			shouldReconnect: (_) => true,
		}
	);

	useEffect(() => {
		if (lastMessage !== null) {
			const obj = JSON.parse(lastMessage.data);
			setRoomInfo(obj);
		}
	}, [lastMessage]);

	useEffect(() => {
		getRoomInfo();
	}, []);

	const handleClickSendMessage = useCallback((e) => {
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
	}, []);

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
				<div className="relative flex justify-center items-center flex-col h-40 w-32 bg-white rounded-xl shadow-[11px_10px_5px_0px_#A09B95] cursor-pointer">
					<Image
						className="max-w-full px-3"
						src={user.questionUrl}
						width={240}
						height={320}
						alt="猜題圖片"
					/>
					<span className="text-xl font-bold text-gray-600">
						{user.questionTitle}
					</span>
				</div>
				<div className="flex justify-center items-center text-2xl align-middle gap-3 font-bold text-yellow-800">
					<span>{user.userName}</span>
				</div>
			</li>
		);
	});

	if (canEnter == null && roomInfo == null) {
		return <Loading />;
	}

	if (canEnter == false) {
		return (
			<>
				<span className="text-xl text-yellow-600 font-bold">
					找不到房間!!!
				</span>
				<LinkButton href="/">返回</LinkButton>
			</>
		);
	}

	if (canEnter && roomInfo.currentUser > roomInfo.maxUser) {
		return (
			<>
				<span className="text-xl text-yellow-600 font-bold">
					人數已滿!!!
				</span>
				<LinkButton href="/">返回</LinkButton>
			</>
		);
	}

	if (canEnter && !user) {
		return (
			<>
				<form
					onSubmit={handleClickSendMessage}
					className="w-4/5 flex justify-center"
				>
					<input
						ref={userRef}
						placeholder="請輸入您的名稱"
						className="rounded-lg py-3 px-5 text-xl w-80"
					/>
				</form>

				<FunctionButton onClick={handleClickSendMessage}>
					進入房間
				</FunctionButton>

				<LinkButton href="/">返回</LinkButton>
			</>
		);
	}

	return (
		<>
			<span className="font-bold text-yellow-600 text-xl">
				分享連結給朋友一起遊玩吧
			</span>
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
					onClick={() =>
						router.push("/guessing-game/start", { scroll: false })
					}
				>
					<MdOutlineKeyboardReturn className="text-2xl" />
				</button>
			</div>
			<ul className="flex flex-wrap gap-5 justify-center mt-5 w-4/5">
				{cards}
			</ul>
		</>
	);
}
