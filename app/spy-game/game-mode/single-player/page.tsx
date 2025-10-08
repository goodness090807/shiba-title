"use client";

import BasicButton from "@/components/Buttons/BasicButton";
import CharacterCard, { useFlipCard } from "@/components/Cards/CharacterCard";
import CountdownSection from "@/components/CountdownSection";
import Loading from "@/components/Loading";
import { Modal } from "@/components/Modals/Modal";
import WrapperBox from "@/components/shared/WrapperBox";
import { useToast } from "@/components/Toast/Toast";
import { cn } from "@/libs/utils";
import useSinglePlayerGameRecordStore from "@/stores/SinglePlayerGameRecord";
import useSinglePlayerSettingStore from "@/stores/SinglePlayerSetting";
import { IUser, roleNames } from "@/types/users";
import { motion } from "framer-motion";
import { Home, MicVocal, RefreshCcw, TriangleAlert, Undo2, UserSearch, Volume2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const SinglePlayer = () => {
  const { underCoverTips, useTimeLimit, timeLimit, hasHydrated, isOpenVoice, toggleOpenVoice } =
    useSinglePlayerSettingStore();
  const {
    hasHydrated: gameHasHydrated,
    users,
    defaultUsers,
    round,
    currentPlayer,
    title,
    titleImg,
    undercoverTitle,
    undercoverTitleImg,
    roundEnd,
    nextTurn,
    nextRound,
    removeUser,
  } = useSinglePlayerGameRecordStore();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [permissionError, setPermissionError] = useState("");
  const [isCheckIdentify, setIsCheckIdentify] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [votedUserId, setVotedUserId] = useState<string | null>(null);
  const [playingUserId, setPlayingUserId] = useState<string | null>(null);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [checkIdentity, setCheckIdentity] = useState(false);

  const [timeLeft, setTimeLeft] = useState(0);
  const { isFlipped, flip } = useFlipCard();
  const { toast } = useToast();

  const router = useRouter();

  const streamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const nextTurnRef = useRef(nextTurn);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 更新 nextTurn ref
  useEffect(() => {
    nextTurnRef.current = nextTurn;
  }, [nextTurn]);

  const handleNextTurn = useCallback(() => {
    if (useTimeLimit) {
      setTimeout(() => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
        flip(false);
        setIsCheckIdentify(false);
      }, 1000);

      setTimeout(() => {
        setIsRecording(false);
        setButtonDisabled(false);
        nextTurnRef.current();
      }, 1500);
    } else {
      flip(false);
      setIsCheckIdentify(false);

      setTimeout(() => {
        setButtonDisabled(false);
        nextTurnRef.current();
      }, 1000);
    }
  }, [flip, useTimeLimit]);

  useEffect(() => {
    if (isRecording && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev < 1) {
            return 0;
          }

          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      handleNextTurn();
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRecording, timeLeft, handleNextTurn]);

  if (!hasHydrated || !gameHasHydrated) {
    return (
      <WrapperBox>
        <Loading title="載入中..." />
      </WrapperBox>
    );
  }

  const PlayRecord = (user: IUser | undefined) => {
    // 清除之前的播放
    if (playingUserId) {
      audioRef.current?.pause();
      audioRef.current!.currentTime = 0;
    }

    if (user?.audio) {
      audioRef.current = new Audio(user.audio);
      setPlayingUserId(user.id);

      // 音頻播放結束時清理
      audioRef.current.addEventListener("ended", () => {
        setPlayingUserId(null);
      });

      // 音頻播放錯誤時清理
      audioRef.current.addEventListener("error", () => {
        setPlayingUserId(null);
      });

      audioRef.current.play();
    }
  };
  const SelectUser = (userId: string) => {
    const selectedUser = users.find((user) => user.id === userId);

    if (isOpenVoice) {
      PlayRecord(selectedUser);
    }

    setVotedUserId(userId);
  };

  const UserStart = async (index: number) => {
    try {
      if (isOpenVoice) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100,
          },
        });
        streamRef.current = stream;

        audioChunksRef.current = [];
        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: "audio/webm;codecs=opus",
        });

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/webm;codecs=opus",
          });

          const audioUrl = URL.createObjectURL(audioBlob);
          useSinglePlayerGameRecordStore.getState().setUserAudio(users[index].id, audioUrl);
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start(100);
      }

      setButtonDisabled(true);
      setIsRecording(true);
      setTimeLeft(timeLimit);
    } catch (error) {
      if (error instanceof Error) {
        setIsOpenModal(true);
        if (error.name === "NotAllowedError") {
          setPermissionError(
            "請允許使用麥克風權限才能紀錄發言過程，不使用時遊戲過程中則不會有任何紀錄，如果不想使用麥克風，請按「確認」後並繼續遊戲"
          );
        } else if (error.name === "NotFoundError") {
          setPermissionError("找不到麥克風設備");
        } else {
          setPermissionError("無法存取麥克風：" + error.message);
        }
      }
    }
  };

  const VoteEnd = () => {
    const votedUser = users.find((user) => user.id === votedUserId)!;
    if (votedUser?.role !== "undercover") {
      toast.success(`${votedUser.name} 被淘汰，他是 ${roleNames[votedUser.role]}`);
    } else {
      toast.error(`${votedUser.name} 被淘汰，他是臥底！`);
    }
    removeUser(votedUserId!);
    nextRound();
  };

  const IdentityModal = (users: IUser[], checkIdentity: boolean) => {
    return (
      <Modal
        icon={<UserSearch />}
        title="查看身分"
        isOpen={checkIdentity}
        onClose={() => setCheckIdentity(false)}
        className="h-[80vh]"
      >
        <div className="grid grid-cols-3 gap-12 items-center p-5">
          {users.map((user) => (
            <motion.button
              key={user.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => SelectUser(user.id)}
              className="relative cursor-pointer group w-16 h-16 rounded-full border-4 border-white shadow-lg group-hover:shadow-xl"
            >
              <Image
                src={user.avatar}
                alt={`玩家 ${user.id}的頭像`}
                width={64}
                height={64}
                className="w-full h-auto object-contain"
              />
              <div className="text-sm text-gray-600 mt-2">{user.name}</div>
              <div
                className={cn("absolute -top-5 left-0 font-bold text-sm mt-1", {
                  "text-[#af2929]": user.role === "undercover",
                  "text-[#0c8539]": user.role === "civilian",
                  "text-secondary": user.role === "whiteboard",
                })}
              >
                {roleNames[user.role]}
              </div>
            </motion.button>
          ))}
        </div>
      </Modal>
    );
  };

  // 當沒有臥底時，顯示遊戲結束
  if (users.filter((user) => user.role === "undercover").length === 0) {
    return (
      <WrapperBox>
        <h2 className="text-2xl font-bold text-primary-text">平民獲勝</h2>
        <p className="text-sm text-gray-600">所有臥底都已被淘汰，遊戲結束</p>
        <Image src="/games/civilian-win.png" alt="平民獲勝" width={240} height={240} className="my-5" />
        <BasicButton
          className="border border-primary-text text-primary-text bg-white/0"
          onClick={() => setCheckIdentity(true)}
        >
          <UserSearch />
          查看身分
        </BasicButton>
        <div className="flex gap-5">
          <BasicButton className="bg-primary-text text-white" onClick={() => router.push("/")}>
            <Home />
            回首頁
          </BasicButton>
          <BasicButton
            className="bg-secondary-text text-white"
            onClick={() => router.push("/spy-game/game-mode/single-player/user-setting")}
          >
            <RefreshCcw />
            重新開始遊戲
          </BasicButton>
        </div>
        {IdentityModal(defaultUsers, checkIdentity)}
      </WrapperBox>
    );
  }

  // 當只剩下臥底時，顯示遊戲結束
  if (
    users.filter((user) => user.role === "civilian").length +
      users.filter((user) => user.role === "whiteboard").length ===
    users.filter((user) => user.role === "undercover").length
  ) {
    return (
      <WrapperBox>
        <h2 className="text-lg font-medium text-primary-text">臥底獲勝</h2>
        <p className="text-sm text-gray-600">平民與臥底人數相同，沒抓到臥底，遊戲結束</p>
        <Image src="/games/undercover-win.png" alt="臥底獲勝" width={180} height={180} />
        <BasicButton
          className="border border-primary-text text-primary-text bg-white/0"
          onClick={() => setCheckIdentity(true)}
        >
          <UserSearch />
          查看身分
        </BasicButton>
        <div className="flex gap-5">
          <BasicButton className="bg-primary text-white" onClick={() => router.push("/")}>
            <Home />
            回首頁
          </BasicButton>
          <BasicButton
            className="bg-secondary-text text-white"
            onClick={() => router.push("/spy-game/game-mode/single-player/user-setting")}
          >
            <RefreshCcw />
            重新開始遊戲
          </BasicButton>
        </div>
        {IdentityModal(defaultUsers, checkIdentity)}
      </WrapperBox>
    );
  }

  if (roundEnd) {
    return (
      <WrapperBox className="gap-10 p-5">
        <h1 className="text-2xl font-bold text-primary-text">此回合已結束</h1>
        <p className="text-sm text-gray-600">請選擇要淘汰的玩家</p>
        <div className="grid grid-cols-3 gap-12 items-center">
          {users.map((user) => (
            <motion.button
              key={user.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => SelectUser(user.id)}
              className={cn(
                "relative cursor-pointer group w-16 h-16 rounded-full border-4 border-white shadow-lg group-hover:shadow-xl",
                {
                  "border-red-500": votedUserId === user.id,
                }
              )}
            >
              <Image
                src={user.avatar}
                alt={`玩家 ${user.id}的頭像`}
                width={64}
                height={64}
                className="w-full h-auto object-contain"
              />
              <span className="text-sm text-gray-600 mt-5">{user.name}</span>
              {playingUserId === user.id && (
                <div className="absolute rounded-full p-1 bg-white top-0 right-0">
                  <Volume2 className="w-3 h-3" />
                </div>
              )}
            </motion.button>
          ))}
        </div>
        <BasicButton className="bg-primary-text text-white mt-5" disabled={!votedUserId} onClick={VoteEnd}>
          進行審判
        </BasicButton>
      </WrapperBox>
    );
  }

  const user = users[currentPlayer];

  return (
    <WrapperBox className="gap-2">
      <div className="flex items-center justify-between gap-1 w-full">
        <Link
          href="/spy-game/game-mode/single-player/user-setting"
          className="text-emphasize-dark font-bold tracking-widest flex gap-1 items-center"
        >
          <Undo2 className="w-6 h-6 md:w-10 md:h-10 text-primary-text" />
        </Link>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-5xl text-primary-text font-bold tracking-widest">誰是臥底</h1>
        </div>

        <div></div>
      </div>

      <h2 className="text-lg font-medium text-primary-text">第 {round} 回合</h2>

      <div className="flex gap-3 items-center">
        請
        <div className="relative group w-16 h-16 rounded-full border-4 border-white shadow-lg">
          <Image src={user.avatar} alt={`玩家的頭像`} width={64} height={64} className="w-full h-auto object-contain" />
        </div>{" "}
        <p className="text-lg font-medium text-primary-text">
          {" "}
          <span className="font-bold text-secondary-text">{user.name}</span>
        </p>
        進行發言
      </div>

      <CharacterCard isFlipped={isFlipped}>
        {isRecording || timeLeft > 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <CountdownSection settingCountDown={timeLimit} countdown={timeLeft}>
              {isOpenVoice && (
                <motion.div
                  className="mt-4 flex items-center justify-center gap-2 text-red-500"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <motion.div
                    className="w-3 h-3 bg-red-500 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-sm font-medium">正在錄音中...</span>
                </motion.div>
              )}
            </CountdownSection>
          </div>
        ) : (
          <div className="flex items-center flex-col h-full gap-5 p-2">
            {underCoverTips && (
              <p className="text-sm text-gray-600">
                你是{" "}
                <span
                  className={cn("font-bold", {
                    "text-[#af2929]": user.role === "undercover",
                    "text-[#0c8539]": user.role === "civilian",
                    "text-secondary": user.role === "whiteboard",
                  })}
                >
                  {roleNames[user.role]}
                </span>
              </p>
            )}
            {!underCoverTips && user.role === "whiteboard" && (
              <p className="text-sm text-gray-600">
                你是 <span className="font-bold text-secondary">{roleNames[user.role]}</span>
              </p>
            )}
            <h2 className="text-4xl font-bold text-gray-800">
              {user.role === "civilian" && title}
              {user.role === "undercover" && undercoverTitle}
              {user.role === "whiteboard" && ""}
            </h2>
            <div className="h-72">
              {user.role !== "whiteboard" ? (
                <Image
                  className="max-w-full px-3 h-full object-contain"
                  src={user.role === "civilian" ? titleImg : undercoverTitleImg}
                  width={240}
                  height={320}
                  style={{ width: "auto", height: "100%" }}
                  alt="猜題圖片"
                />
              ) : (
                <Image
                  className="max-w-full px-3"
                  src={"/whiteboard.png"}
                  width={240}
                  height={320}
                  style={{ width: "auto", height: "auto" }}
                  alt="猜題圖片"
                />
              )}
            </div>
          </div>
        )}
      </CharacterCard>

      {isCheckIdentify ? (
        <>
          {useTimeLimit ? (
            <BasicButton
              className="bg-blue-500 text-white"
              disabled={isRecording}
              onClick={() => UserStart(currentPlayer)}
            >
              <MicVocal />
              {isRecording ? "正在發言..." : "開始發言"}
            </BasicButton>
          ) : (
            <BasicButton
              className="bg-primary-text text-white"
              onClick={() => {
                setButtonDisabled(true);
                handleNextTurn();
              }}
            >
              換下一位發言
            </BasicButton>
          )}
        </>
      ) : (
        <BasicButton
          disabled={buttonDisabled}
          onClick={() => {
            flip(true);
            setIsCheckIdentify(true);
          }}
        >
          查看身分
        </BasicButton>
      )}

      <Modal icon={<TriangleAlert />} title="提示訊息" isOpen={isOpenModal} onClose={() => setIsOpenModal(false)}>
        <p className="text-center text-primary-text mb-3">{permissionError}</p>
        <div className="flex justify-center gap-5">
          <BasicButton
            onClick={() => {
              toggleOpenVoice();
              setIsOpenModal(false);
            }}
          >
            確認
          </BasicButton>
          <BasicButton onClick={() => setIsOpenModal(false)}>關閉</BasicButton>
        </div>
      </Modal>
    </WrapperBox>
  );
};

export default SinglePlayer;
