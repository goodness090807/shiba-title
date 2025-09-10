"use client";

import FunctionButton from "@/components/FunctionButton";
import LinkButton from "@/components/LinkButton";
import { useRoomInfo } from "@/hooks/guessing-game-hooks";
import { use, useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import Cards from "../components/Cards";
import RoomHeader from "../components/RoomHeader";
import RoomLoading from "../components/RoomLoading";

export default function Room({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = use(params);

  const { loading, roomInfo, error } = useRoomInfo(id);
  const [room, setRoom] = useState(roomInfo);
  const [status, setStatus] = useState("waiting");
  const [user, setUser] = useState<string | null>(null);
  const userNameRef = useRef<HTMLInputElement | null>(null);

  const { sendMessage, lastMessage } = useWebSocket(`${process.env.NEXT_PUBLIC_WEB_SOCKET_PATH}/ws`, {
    shouldReconnect: () => true,
  });

  useEffect(() => {
    if (lastMessage !== null) {
      setStatus("entering");
      setRoom(JSON.parse(lastMessage.data));
      setStatus("entered");
    }
  }, [lastMessage]);

  const useSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!userNameRef.current?.value) {
      alert("請輸入您的名稱");
      return;
    }

    sendMessage(
      JSON.stringify({
        id,
        userName: userNameRef.current.value,
      })
    );

    if (userNameRef.current) {
      setUser(userNameRef.current.value);
    }
  };

  if (loading) {
    return <RoomLoading>讀取中</RoomLoading>;
  }

  if (error) {
    return (
      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center flex flex-col gap-3">
        <span className="font-bold text-yellow-600 text-xl mx-3">{error}</span>
        <LinkButton href="/">返回</LinkButton>
      </main>
    );
  }

  if (status === "waiting" && user == null) {
    return (
      <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-5">
        <form onSubmit={useSendMessage} className="w-4/5 flex justify-center flex-col items-center gap-5">
          <input
            ref={userNameRef}
            placeholder="請輸入您的名稱"
            className="rounded-lg py-3 px-5 text-xl w-80 bg-white shadow"
          />
          <FunctionButton type="submit">進入房間</FunctionButton>
        </form>

        <LinkButton href="/guessing-game/start">返回</LinkButton>
      </main>
    );
  }

  if (status === "entering" || room == null) {
    return <RoomLoading>進入房間中</RoomLoading>;
  }

  return (
    <main className="w-full flex flex-col items-center gap-5 mb-5">
      <RoomHeader room={room} />
      <Cards withoutSelfUsers={room.withoutSelfUsers} />
    </main>
  );
}
