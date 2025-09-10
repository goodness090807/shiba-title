"use client";

import { cn } from "@/libs/utils";
import Image from "next/image";
import { useState } from "react";

interface ICharacterCardProps {
  isFlipped: boolean;
  children: React.ReactNode;
}

export const useFlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const flip = (flipped: boolean) => setIsFlipped(flipped);
  return { isFlipped, flip };
};

const CharacterCard = ({ isFlipped, children }: ICharacterCardProps) => {
  const cardStyle =
    "absolute w-full h-full backface-hidden shadow-lg rounded-xl flex items-center justify-center text-white text-2xl";
  const backCardStyle = cn(cardStyle, "bg-light border border-black/10");
  const openCardStyle = cn(cardStyle, "rotate-y-180 bg-white h-full");

  return (
    <div className={`w-70 h-104 mx-5 duration-500 preserve-3d ${isFlipped ? "rotate-y-180" : ""}`}>
      <div className={backCardStyle}>
        <Image
          src={"/card-back.png"}
          alt="柴犬背卡"
          height={320}
          width={240}
          priority
          className="w-full h-auto object-contain rounded-xl"
          style={{ width: "auto", height: "auto" }}
        />
      </div>
      <div className={openCardStyle}>{children}</div>
    </div>
  );
};

export default CharacterCard;
