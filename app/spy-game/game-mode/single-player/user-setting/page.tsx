"use client";

import { titlesAPI } from "@/apis/titles";
import BasicButton from "@/components/Buttons/BasicButton";
import Loading from "@/components/Loading";
import { Modal } from "@/components/Modals/Modal";
import WrapperBox from "@/components/shared/WrapperBox";
import { avatarImages } from "@/libs/variables";
import useSinglePlayerGameRecordStore from "@/stores/SinglePlayerGameRecord";
import useSinglePlayerSettingStore from "@/stores/SinglePlayerSetting";
import { IUser } from "@/types/users";
import { motion } from "framer-motion";
import { Image as LucideImage, Play, Undo2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserCard = ({
  name,
  index,
  avatar,
  onNameChange,
  onAvatarChange,
}: {
  name: string;
  avatar: string;
  index: number;
  onNameChange: (newName: string) => void;
  onAvatarChange: (newAvatar: string) => void;
}) => {
  const [isOpenAvatarModal, setIsOpenAvatarModal] = useState(false);

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <h2 className="text-lg font-semibold mb-3">玩家 {index + 1}</h2>
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpenAvatarModal(true)}
          className="relative cursor-pointer group w-16 h-16 rounded-full border-4 border-white shadow-lg group-hover:shadow-xl transition-all duration-300"
        >
          <Image
            src={avatar}
            alt={`玩家 ${index + 1}的頭像`}
            width={64}
            height={64}
            className="w-full h-auto object-contain"
          />
        </motion.button>
        <input
          type="text"
          placeholder="請輸入玩家名稱"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          className="w-4/5 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Modal
        icon={<LucideImage />}
        title="選擇頭像"
        isOpen={isOpenAvatarModal}
        onClose={() => setIsOpenAvatarModal(false)}
      >
        <div className="grid grid-cols-3 gap-4">
          {avatarImages.map((avatarOption) => (
            <motion.button
              key={avatarOption}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onAvatarChange(avatarOption); // 設定新的 avatar
                setIsOpenAvatarModal(false);
              }}
              className={`relative group w-16 h-16 md:w-32 md:h-32 ${
                avatar === avatarOption ? "ring-2 ring-blue-500 rounded-xl" : ""
              }`}
            >
              <Image
                src={avatarOption}
                alt={avatarOption}
                className="w-full h-full object-contain rounded-xl border-2 border-transparent group-hover:border-blue-500 transition-all duration-200"
                width={100}
                height={100}
              />
            </motion.button>
          ))}
        </div>
      </Modal>
    </motion.div>
  );
};

const SinglePlayerUserSetting = () => {
  const { users, playerCount, undercoverCount, whiteBoardCount, hasHydrated, updateUser, initializeUsers } =
    useSinglePlayerSettingStore();
  const { startGame } = useSinglePlayerGameRecordStore();
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (hasHydrated && playerCount && !isInitialized) {
      if (users.length === 0) {
        initializeUsers(playerCount);
      }
      setIsInitialized(true);
    }
  }, [playerCount, initializeUsers, isInitialized, hasHydrated, users.length]);

  const handleNameChange = (userId: string, newName: string) => {
    updateUser(userId, { name: newName });
  };

  const handleAvatarChange = (userId: string, newAvatar: string) => {
    updateUser(userId, { avatar: newAvatar });
  };

  const startGameAndRedirect = async (users: IUser[], undercoverCount: number, whiteBoardCount: number) => {
    setIsLoading(true);
    const { title, titleImg, undercoverTitle, undercoverTitleImg } = await titlesAPI.getSpyGameTitles();
    startGame(users, undercoverCount, whiteBoardCount, title, titleImg, undercoverTitle, undercoverTitleImg);

    router.push("/spy-game/game-mode/single-player");
  };

  // 如果還沒水合完成，顯示 loading
  if (!hasHydrated) {
    return (
      <WrapperBox>
        <Loading title="載入中..." />
      </WrapperBox>
    );
  }

  // 如果還沒初始化，也顯示 loading
  if (!isInitialized) {
    return (
      <WrapperBox>
        <Loading title="初始化玩家..." />
      </WrapperBox>
    );
  }

  if (isLoading) {
    return (
      <WrapperBox>
        <Loading title="準備遊戲中..." />
      </WrapperBox>
    );
  }

  return (
    <WrapperBox>
      <div className="flex items-center justify-between gap-1 w-full sticky top-0 bg-white z-10 py-4">
        <Link
          href="/spy-game/game-mode/single-player/setting"
          className="text-emphasize-dark font-bold tracking-widest flex gap-1 items-center"
        >
          <Undo2 className="w-6 h-6 md:w-10 md:h-10 text-primary-text" />
        </Link>
        <div className="flex items-center gap-3">
          <Image src="/undercover.png" className="h-10 md:h-20 w-auto" alt="誰是臥底" width={114} height={114} />
          <h1 className="text-2xl md:text-5xl text-primary-text font-bold tracking-widest">誰是臥底</h1>
        </div>

        <BasicButton onClick={async () => startGameAndRedirect(users, undercoverCount, whiteBoardCount)}>
          <Play />
          開始遊戲
        </BasicButton>
      </div>
      <h2 className="text-secondary-text">為玩家命名，並選擇可愛的貼圖吧</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {users.map((user, index) => (
          <UserCard
            key={user.id}
            name={user.name}
            avatar={user.avatar}
            index={index}
            onNameChange={(newName) => handleNameChange(user.id, newName)}
            onAvatarChange={(newAvatar) => handleAvatarChange(user.id, newAvatar)}
          />
        ))}
      </div>
    </WrapperBox>
  );
};

export default SinglePlayerUserSetting;
