"use client";

import { IUser } from "@/hooks/guessing-game-hooks";
import Image from "next/image";

const Cards = ({ withoutSelfUsers }: { withoutSelfUsers: IUser[] }) => {
  const cards = withoutSelfUsers.map((user) => {
    return (
      <li key={user.socketId} className="flex flex-col gap-3">
        <div className="relative flex justify-center items-center flex-col h-40 w-32 bg-white rounded-xl shadow-[11px_10px_5px_0px_#A09B95]">
          <Image className="max-w-full px-3" src={user.questionUrl} width={240} height={320} alt="猜題圖片" />
          <span className="text-xl font-bold text-gray-600">{user.questionTitle}</span>
        </div>
        <span className="text-xl flex justify-center font-bold text-yellow-800">{user.userName}</span>
      </li>
    );
  });

  return (
    <ul className="flex flex-wrap gap-5 justify-center w-4/5">
      <li className="flex flex-col gap-3">
        <div className="flex items-center justify-center h-40 w-32 px-1 rounded-xl border-4 border-[#a7844c] bg-[#fffeef] shadow-[11px_10px_5px_0px_#A09B95]">
          <Image src={"/card-back.png"} alt="柴犬背卡" height={320} width={240} />
        </div>
        <span className="text-xl flex justify-center font-bold text-yellow-800">你的牌(不能看)</span>
      </li>
      {cards}
    </ul>
  );
};

export default Cards;
