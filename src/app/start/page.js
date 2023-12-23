"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Loading from "@/components/Loading";
import { getGameQuestion } from "@/apis/db";
import LinkButton from "@/components/LinkButton";
import FunctionButton from "@/components/FunctionButton";

export default function StartPage() {
	const ref = useRef(null);
	const [animationHide, setAnimationHide] = useState(false);
	const [gameQuestion, setGameQuestion] = useState(null);

	const hide = classNames({ hidden: animationHide });

	const setNewImage = async () => {
		const newgameQuestion = await JSON.parse(await getGameQuestion());

		setGameQuestion(newgameQuestion);
	};

	useEffect(() => {
		setNewImage();
	}, []);

	const refreshImage = () => {
		setGameQuestion(null);
		ref.current.style.transform = "rotateY(0deg)";

		setNewImage();
	};

	const flipCardHandler = () => {
		if (ref.current.style.transform == "rotateY(180deg)") {
			ref.current.style.transform = "rotateY(0deg)";
			setAnimationHide(false);
		} else {
			ref.current.style.transform = "rotateY(180deg)";
			setAnimationHide(true);
		}
	};

	if (gameQuestion == null) {
		return <Loading />;
	}

	return (
		<>
			<div
				ref={ref}
				style={{ transformStyle: "preserve-3d" }}
				className="relative h-80 w-60 transition-all duration-700"
			>
				<div
					onClick={flipCardHandler}
					style={{
						backfaceVisibility: "hidden",
						WebkitBackfaceVisibility: "hidden",
						transform: "rotateY(180deg)",
					}}
					className="absolute flex justify-center h-80 w-60 bg-white rounded-xl shadow-[11px_10px_5px_0px_#A09B95] cursor-pointer"
				>
					{gameQuestion && (
						<div className="flex justify-center items-center flex-col">
							<h2 className="text-4xl font-bold text-gray-800">
								{gameQuestion.title}
							</h2>
							<Image
								className=" max-w-full px-3"
								src={gameQuestion.url}
								width={240}
								height={320}
								alt="猜題圖片"
							/>
						</div>
					)}
				</div>
				<div
					style={{
						backfaceVisibility: "hidden",
						WebkitBackfaceVisibility: "hidden",
					}}
					onClick={flipCardHandler}
					className="absolute flex items-center justify-center h-80 w-60 px-1 rounded-xl cursor-pointer
				border-4 border-[#a7844c] bg-[#fffeef] shadow-[11px_10px_5px_0px_#A09B95]"
				>
					<span
						className={`absolute flex items-center justify-center h-6 w-6 ${hide}`}
					>
						<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8d6626] opacity-75"></span>
					</span>
					<Image
						src={"/card-back.png"}
						alt="柴犬背卡"
						height={320}
						width={240}
					/>
				</div>
			</div>

			<FunctionButton onClick={refreshImage}>重新產生</FunctionButton>
			<LinkButton href="/">返回</LinkButton>
		</>
	);
}
