"use client";

import BasicButton from "@/components/Buttons/BasicButton";
import BaseCard from "@/components/Cards/BaseCard";
import Loading from "@/components/Loading";
import WrapperBox from "@/components/shared/WrapperBox";
import { cn } from "@/libs/utils";
import useSinglePlayerSettingStore from "@/stores/SinglePlayerSetting";
import { CircleArrowRight, Eye, MicVocal, Timer, Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ToggleButton = ({
  icon,
  label,
  isActive,
  onClick,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}) => (
  <button
    className={cn(
      "flex items-center p-2 rounded-md bg-gray-100 text-gray-500 cursor-pointer transition-colors duration-200",
      {
        "text-secondary": isActive,
      },
      className
    )}
    onClick={onClick}
  >
    {icon}
    <span className="ml-2">{label}</span>
  </button>
);

const SinglePlayerSetting = () => {
  const {
    playerCount,
    undercoverCount,
    whiteBoardCount,
    useTimeLimit,
    timeLimit,
    underCoverTips,
    hasHydrated,
    isOpenVoice,
    setPlayerCount,
    setUnderCoverCount,
    setWhiteBoardCount,
    toggleTimeLimit,
    toggleUnderCoverTips,
    toggleOpenVoice,
    setTimeLimit,
    clearUsers,
  } = useSinglePlayerSettingStore();
  const router = useRouter();

  if (!hasHydrated) {
    return (
      <WrapperBox>
        <Loading title="載入中..." />
      </WrapperBox>
    );
  }

  return (
    <WrapperBox>
      <div className="flex items-center justify-between gap-1 w-full">
        <Link href="/" className="text-emphasize-dark font-bold tracking-widest flex gap-1 items-center">
          <Undo2 className="w-6 h-6 md:w-10 md:h-10 text-primary-text" />
        </Link>
        <div className="flex items-center gap-3">
          <Image src="/undercover.png" className="h-10 md:h-20 w-auto" alt="誰是臥底" width={114} height={114} />
          <h1 className="text-2xl md:text-5xl text-primary-text font-bold tracking-widest">誰是臥底</h1>
        </div>
        <div className="w-6 h-6 md:w-10 md:h-10"></div>
      </div>
      <p className="text-sm md:text-lg text-secondary-text">遊戲設定</p>
      <div className="flex gap-3">
        <BaseCard>
          <h2 className="text-lg md:text-2xl text-primary-text tracking-widest">遊玩人數</h2>
          <Image src="/whiteboard.png" className="h-30 w-auto" alt="白板" width={114} height={114} />
          <input
            type="number"
            inputMode="numeric"
            className="absolute text-center bottom-5 text-lg font-bold w-10 bg-white [&::-webkit-inner-spin-button]:appearance-none"
            onFocus={(e) => e.target.select()}
            onChange={(e) => setPlayerCount(Number(e.target.value))}
            onBlur={(e) => {
              if (Number(e.target.value) < 4) {
                setPlayerCount(4);
              }

              // 臥底人數最大值
              const limitUnderCover = Number(e.target.value) / 4 < 1 ? 1 : Math.floor(Number(e.target.value) / 4);
              // 如果臥底人數大於最大值，則設置為最大值
              if (undercoverCount > limitUnderCover) {
                setUnderCoverCount(limitUnderCover);
              }

              // 白板人數最大值
              const limitWhiteBoard = Number(e.target.value) / 6 < 1 ? 1 : Math.floor(Number(e.target.value) / 6);
              // 如果白板人數大於最大值，則設置為最大值
              if (whiteBoardCount > limitWhiteBoard) {
                setWhiteBoardCount(limitWhiteBoard);
              }
            }}
            value={playerCount}
          />
        </BaseCard>
        <BaseCard>
          <h2 className="text-lg md:text-2xl text-primary-text tracking-widest">臥底</h2>
          <Image src="/whiteboard.png" className="h-30 w-auto" alt="臥底" width={114} height={114} />

          <input
            type="number"
            inputMode="numeric"
            className="absolute text-center bottom-5 text-lg font-bold w-10 bg-white [&::-webkit-inner-spin-button]:appearance-none"
            onFocus={(e) => e.target.select()}
            onChange={(e) => setUnderCoverCount(Number(e.target.value))}
            value={undercoverCount}
          />
        </BaseCard>
        <BaseCard>
          <h2 className="text-lg md:text-2xl text-primary-text tracking-widest">白板</h2>
          <Image src="/whiteboard.png" className="h-30 w-auto" alt="白板" width={114} height={114} />
          <input
            type="number"
            inputMode="numeric"
            className="absolute text-center bottom-5 text-lg font-bold w-10 bg-white [&::-webkit-inner-spin-button]:appearance-none"
            onFocus={(e) => e.target.select()}
            onChange={(e) => setWhiteBoardCount(Number(e.target.value))}
            value={whiteBoardCount}
          />
        </BaseCard>
      </div>
      <div className="grid grid-cols-2 gap-1 w-full">
        <ToggleButton icon={<Eye />} label="臥底提示" isActive={underCoverTips} onClick={toggleUnderCoverTips} />
        <ToggleButton icon={<MicVocal />} label="語音輸入" isActive={isOpenVoice} onClick={toggleOpenVoice} />

        {/* <button
          className={cn(
            "flex items-center justify-between p-2 rounded-md bg-gray-100 text-gray-500 col-span-2 border-2 border-gray-50 cursor-pointer",
            {
              "text-secondary": categories.length > 0,
            }
          )}
          onClick={() => setCategoryModalOpen(true)}
        >
          <div className="flex">
            <Book />
            <span className="ml-2">題目篩選</span>
          </div>
          <ChevronUp className="w-4 h-4" />
        </button> */}
      </div>
      <div className="grid grid-cols-2 gap-2 w-full">
        <button
          className={cn("flex items-center p-2 rounded-md bg-gray-100 text-gray-500 cursor-pointer", {
            "text-secondary": useTimeLimit,
          })}
          onClick={
            useTimeLimit
              ? () => {
                  toggleTimeLimit();
                  setTimeLimit(0);
                }
              : () => {
                  toggleTimeLimit();
                  setTimeLimit(20);
                }
          }
        >
          <Timer />
          <span className="ml-2">時間限制</span>
        </button>
        <div
          className={cn("flex items-center rounded-md", {
            "bg-white": useTimeLimit,
            "bg-gray-300": !useTimeLimit,
          })}
        >
          <input
            type="number"
            inputMode="numeric"
            onChange={(e) => {
              setTimeLimit(Number(e.target.value));
            }}
            onFocus={(e) => e.target.select()}
            value={timeLimit}
            className={cn("text-center text-lg font-bold text-gray-500 bg-transparent rounded-md w-4/5", {
              "text-gray-800": useTimeLimit,
            })}
            disabled={!useTimeLimit}
          />
          <span
            className={cn("text-lg font-bold text-gray-500", {
              "text-gray-800": useTimeLimit,
            })}
          >
            秒
          </span>
        </div>
      </div>
      <BasicButton
        onClick={() => {
          clearUsers();
          router.push("/spy-game/game-mode/single-player/user-setting");
        }}
      >
        <CircleArrowRight />
        下一步
      </BasicButton>
    </WrapperBox>
  );
};

export default SinglePlayerSetting;
