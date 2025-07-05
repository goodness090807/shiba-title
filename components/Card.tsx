"use client";

import { cn } from "@/libs/utils";
import Image from "next/image";
import { useState } from "react";

interface IQuestionProps {
  title: string;
  url: string;
}

const Card = ({ question }: { question: IQuestionProps }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardStyle =
    "absolute w-full h-full backface-hidden shadow-[11px_10px_5px_0px_#A09B95] rounded-xl flex items-center justify-center text-white text-2xl";
  const backCardStyle = cn(cardStyle, "bg-light border-4 border-emphasize-dark");
  const openCardStyle = cn(cardStyle, "rotate-y-180 bg-white");

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <button className="w-full h-96 cursor-pointer flex justify-center items-center" onClick={handleClick}>
      <div className={`relative w-72 h-full duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
        <div className={backCardStyle}>
          <Image src={"/card-back.png"} alt="柴犬背卡" height={320} width={240} priority />
        </div>
        <div className={openCardStyle}>
          <div className="flex items-center flex-col">
            <h2 className="text-4xl h-20 font-bold text-gray-800">{question.title}</h2>
            <Image
              onLoad={() => setIsFlipped(true)}
              className="max-w-full px-3"
              src={question.url}
              width={240}
              height={320}
              alt="猜題圖片"
            />
          </div>
        </div>
      </div>
    </button>
  );
};

export default Card;
