"use client";

import CircleButton from "@/components/CircleButton";
import Loading from "@/components/Loading";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaHome, FaPlay } from "react-icons/fa";

export default function GuessingGame() {
    const router = useRouter();
    const [people, setPeople] = useState(2);
    const [loading, setLoading] = useState(false);

    const createRoom = async () => {
        setLoading(true);

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_PATH}/room`, {
                maxUser: people,
            });
            router.push(`/guessing-game/room/${response.data}`);
        } catch {
            alert("主機壞啦，請晚點再試!!!");
        }
    };

    if (loading) {
        return (
            <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <span className="font-bold text-yellow-600 text-xl mx-3">房間產生中(請耐心等待...)</span>
                <Loading />
            </main>
        );
    }

    return (
        <main className="w-full flex flex-col items-center gap-5 mt-20">
            <div className="flex flex-col justify-center items-center w-[350px] md:w-[450px] bg-white/30 shadow-2xl rounded-2xl p-5">
                <span className="font-bold text-yellow-600 text-xl">遊玩人數</span>
                <div className="flex flex-wrap gap-2">
                    <input
                        type="range"
                        className="accent-yellow-800 w-auto md:w-48"
                        step={1}
                        min={2}
                        max={20}
                        value={people}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPeople(Number(e.target.value))}
                    />
                    <span className="text-yellow-800 font-bold text-2xl text-center">{people}</span>
                </div>
                <div className="w-full mt-5 flex justify-center gap-10">
                    <CircleButton onClick={createRoom} title="創立房間">
                        <FaPlay />
                    </CircleButton>
                    <Link href="/" title="回首頁">
                        <CircleButton>
                            <FaHome />
                        </CircleButton>
                    </Link>
                </div>
                <div className="px-3 mx-5 max-w-[650px] tracking-widest">
                    <h2 className="text-xl py-2">遊戲介紹</h2>
                    <ul className="flex flex-col gap-3 mt-3">
                        <li className="border-l-4 border-emphasize-dark pl-3">
                            本遊戲是一款猜題遊戲，是可以輔助您出題的小工具，每個房間最多可以容納 20 位玩家。
                        </li>
                        <li className="border-l-4 border-emphasize-dark pl-3">
                            遊戲開始後，系統會幫您分配一個題目，自己是看不到題目的，當有朋友進來時，會看到朋友的題目，可以藉此給予提示。
                        </li>
                        <li className="border-l-4 border-emphasize-dark pl-3">
                            在線下的您們，可以透過任何遊玩方式來猜出自己的題目是什麼。
                        </li>
                        <li className="border-l-4 border-emphasize-dark pl-3">
                            像是可以透過是不是問題、是不是動物、是不是食物等等方式來猜題目。
                        </li>
                        <li className="border-l-4 border-emphasize-dark pl-3">
                            或是透過團隊合作的方式，由隊友給自己提示並猜出題目。
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    );
}
