"use client";

import { FaRegQuestionCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
	const modes = [
		{
			src: "/title-generator.png",
			href: "/title-generator",
			title: "題目產生器",
		},
		{
			src: "/guessing-game.png",
			href: "/guessing-game/start",
			title: "猜題遊戲",
		},
	];

	const gameCards = modes.map((mode) => {
		return (
			<Link
				key={mode.title}
				href={mode.href}
				className="relative w-52 h-52 bg-white rounded-2xl flex justify-center shadow-[0_0_30px_-5px] shadow-yellow-800 cursor-pointer duration-500
							hover:-translate-y-3"
			>
				<div className="flex flex-col items-center justify-center w-52 h-52 overflow-hidden ">
					<Image
						src={mode.src}
						alt={mode.title}
						className="w-40 h-40"
						width={192}
						height={192}
					/>
					<span className="font-bold text-xl">{mode.title}</span>
				</div>
			</Link>
		);
	});

	return (
		<div className="flex flex-col items-center gap-6">
			<div className="flex items-center justify-center gap-4 flex-wrap">
				<span className="font-bold text-yellow-600 text-xl">
					點擊遊戲選單開始遊戲
				</span>

				<button
					className="text-white bg-yellow-800 rounded-lg px-3 font-bold text-lg tracking-widest py-3 w-40 
					flex items-center justify-center hover:bg-yellow-700"
					onClick={() =>
						alert(
							"歡迎來到柴題遊戲，本網站提供兩種遊戲讓您遊玩。\r\n\r\n1. 題目產生器：可以拿來為遊戲出題，擁有多變化的玩法，你只要理柴，柴就會幫你。\r\n\r\n2. 猜題遊戲：此遊戲提供連線模式，遊戲會為每一個人出一個題目，但是自己無法看到，必須由其他人提示猜出答案。\r\n\r\n本網站提供以下兩種玩法給您參考：\r\n\r\n(1) 隨意發問，主持人或是其他人只能回答是或否，輪流詢問，直到猜到答案。\r\n\r\n(2) 分成兩隊，一個回合只能給予隊友提示或猜自己的答案，猜錯時會有懲罰，兩隊輪流作答，直到一隊全部猜完。(猜對的人可以繼續給予提示)"
						)
					}
				>
					<FaRegQuestionCircle className="mr-2" />
					遊戲說明
				</button>
			</div>

			<div className="flex justify-center items-center gap-6 flex-wrap">
				{gameCards}
			</div>
		</div>
	);
}
