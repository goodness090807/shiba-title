"use client";

import FunctionButton from "@/components/FunctionButton";
import LinkButton from "@/components/LinkButton";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
	const [mode, setMode] = useState(0);

	const modes = {
		0: {
			src: "/title-generator.png",
			title: "題目產生器",
		},
		1: {
			src: "/guessing-game.png",
			title: "猜題遊戲",
		},
	};

	return (
		<div className="flex flex-col items-center gap-4">
			<span className="font-bold text-yellow-600 text-xl">
				本柴給你無限想像
			</span>
			<div className="relative w-64 h-64 bg-white rounded-full flex justify-center shadow-[0_0_30px_-5px] shadow-yellow-800">
				<div className="absolute -translate-y-2 shadow-xl shadow-gray-300 text-lg bg-[#FDCB7B] text-white font-bold px-8 py-1 rounded-full border-2 border-white">
					Game Mode
				</div>
				<div className="flex flex-col items-center justify-center w-64 h-64 overflow-hidden rounded-full select-none">
					<Image
						src={modes[mode].src}
						alt={modes[mode].title}
						className="w-40 h-40"
						width={192}
						height={192}
					/>
					<span className="font-bold text-xl">
						{modes[mode].title}
					</span>
				</div>
				<div
					className="absolute cursor-pointer top-1/2 p-4 text-lg font-bold left-0 w-auto -mt-7 text-[#FDCB7B]"
					onClick={() => setMode(mode == 0 ? 1 : 0)}
				>
					❮
				</div>
				<div
					className="absolute cursor-pointer top-1/2 p-4 text-lg font-bold right-0 w-auto -mt-7 text-[#FDCB7B]"
					onClick={() => setMode(mode == 0 ? 1 : 0)}
				>
					❯
				</div>
			</div>
			<LinkButton
				href={mode == 0 ? "/title-generator" : "/guessing-game/start"}
			>
				開始
			</LinkButton>
			<FunctionButton
				onClick={() =>
					alert(
						"歡迎來到柴題遊戲，本網站提供兩種遊戲讓您遊玩。\r\n\r\n1. 題目產生器：可以拿來為遊戲出題，擁有多變化的玩法，你只要理柴，柴就會幫你。\r\n\r\n2.猜題遊戲：此遊戲提供連線模式，遊戲會為每一個人出一個題目，但是自己無法看到，必須由其他人提示猜出答案。\r\n\r\n本網站提供以下兩種玩法給您參考：\r\n\r\n(1) 隨意發問，主持人或是其他人只能回答是或否，輪流詢問，直到猜到答案。\r\n\r\n(2) 分成兩隊，一個回合只能給予隊友提示或猜自己的答案，猜錯時會有懲罰，兩隊輪流作答，直到一隊全部猜完。(猜對的人可以繼續給予提示)"
					)
				}
			>
				說明
			</FunctionButton>
		</div>
	);
}
