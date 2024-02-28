"use client";

import FunctionButton from "@/components/FunctionButton";
import LinkButton from "@/components/LinkButton";
import Loading from "@/components/Loading";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import GameTitle from "@/components/GameTitle";

export default function GuessingGame() {
	const router = useRouter();
	const [people, setPeople] = useState(2);
	const [loading, setLoading] = useState(false);

	const createRoom = async () => {
		setLoading(true);

		try {
			const response = await axios.post(
				`${process.env.NEXT_PUBLIC_API_PATH}/room`,
				{
					maxUser: people,
				}
			);
			router.push(`/guessing-game/room?id=${response.data}`);
		} catch {
			alert("主機壞啦，請晚點再試!!!");
		}
	};

	return (
		<>
			<GameTitle title={"猜題遊戲"} />
			{loading ? (
				<>
					<span className="font-bold text-yellow-600 text-xl mx-3">
						房間產生中(主機較差，請耐心等待)...
					</span>
					<Loading />
				</>
			) : (
				<>
					<div className="flex gap-2">
						<span className="font-bold text-yellow-600 text-xl">
							遊玩人數
						</span>
						<input
							type="range"
							className="accent-yellow-800 w-48"
							step={1}
							min={2}
							max={20}
							value={people}
							onChange={(e) => setPeople(e.target.value)}
						/>
						<span className="w-10 text-yellow-800 font-bold text-2xl text-center">
							{people}
						</span>
					</div>
					<FunctionButton onClick={createRoom}>
						創立房間
					</FunctionButton>
					<LinkButton href="/">返回</LinkButton>
				</>
			)}
		</>
	);
}
