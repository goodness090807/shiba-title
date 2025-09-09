"use client";

import { useRandomOneTitle } from "@/hooks/queries/useTitles";
import { RotateCw } from "lucide-react";
import Image from "next/image";
import TopicBoard from "./_components/TopicBoard";

export default function TitleGenerator() {
  const { data, isLoading, isFetching, error, refetch } = useRandomOneTitle();

  if (error) {
    return <div>發生錯誤，請稍後再試。</div>;
  }

  const loading = isLoading || isFetching;

  return (
    <div className="flex flex-col items-center justify-center h-[90dvh] px-4">
      <TopicBoard>
        <div className="text-center w-full">
          {(loading || !data) && (
            <span className="font-bold text-secondary-text px-3 text-3xl md:text-4xl">
              天靈靈，地靈靈，遊戲題目快顯靈!!!
            </span>
          )}
          {!loading && data && <span className="font-bold text-secondary-text text-4xl md:text-6xl">{data.name}</span>}
          <div className="flex justify-center px-3 h-[300px]">
            {!loading && data ? (
              <Image
                className="max-w-full px-3 h-full object-contain"
                style={{ width: "auto", height: "100%" }}
                src={data.image}
                width={240}
                height={320}
                alt="猜題圖片"
              />
            ) : (
              <div className="w-[300px] h-[350px] bg-[url('/loading.png')] animate-shiba-loading"></div>
            )}
          </div>
        </div>
        {!loading && (
          <button
            className="px-4 py-2 bg-emphasize text-white rounded-md flex items-center gap-2 cursor-pointer hover:bg-emphasize-dark transition-colors duration-300"
            onClick={() => refetch()}
          >
            <RotateCw className="h-6 w-6" />
            <span className="flex items-center">生成新題目</span>
          </button>
        )}
      </TopicBoard>
    </div>
  );
}
