"use client";

import { getGameQuestion } from "@/apis/db";
import Card from "@/components/Card";
import CircleButton from "@/components/CircleButton";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome, FaSyncAlt } from "react-icons/fa";

export default function TitleGenerator() {
  const [gameQuestion, setGameQuestion] = useState(null);

  const setNewImage = async () => {
    const newgameQuestion = await JSON.parse(await getGameQuestion());

    setGameQuestion(newgameQuestion);
  };

  useEffect(() => {
    setNewImage();
  }, []);

  const refreshImage = () => {
    setGameQuestion(null);

    setNewImage();
  };

  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col justify-center items-center w-[350px] md:w-[450px] h-[550px] bg-white/30 shadow-2xl rounded-2xl p-5">
        {gameQuestion == null && <Loading title={"天靈靈，地靈靈，遊戲題目快顯靈!!!"} />}
        {gameQuestion != null && (
          <>
            <Card question={gameQuestion} />
            <div className="w-full mt-5 flex justify-center gap-10">
              <CircleButton onClick={refreshImage} title="重新產生">
                <FaSyncAlt />
              </CircleButton>
              <Link href="/" title="回首頁">
                <CircleButton>
                  <FaHome />
                </CircleButton>
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
