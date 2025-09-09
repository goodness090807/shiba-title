"use client";

import { IUser } from "@/types/users";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SinglePlayerSettingState {
  users: IUser[];
  playerCount: number;
  undercoverCount: number;
  whiteBoardCount: number;
  isOpenVoice: boolean;
  useTimeLimit: boolean;
  firstWhiteBoard: boolean;
  underCoverTips: boolean;
  timeLimit: number;
  categories: string[];
  hasHydrated: boolean;
}

interface SinglePlayerSettingActions {
  setPlayerCount: (count: number) => void;
  setUnderCoverCount: (count: number) => void;
  setWhiteBoardCount: (count: number) => void;
  toggleFirstWhiteBoard: () => void;
  toggleTimeLimit: () => void;
  toggleOpenVoice: () => void;
  toggleUnderCoverTips: () => void;
  updateUser: (id: string, data: Partial<IUser>) => void;
  initializeUsers: (playerCount: number) => void;
  clearUsers: () => void;
  setTimeLimit: (time: number) => void;
  setCategories: (categories: string[]) => void;
  setHasHydrated: (hydrated: boolean) => void;
}

type SinglePlayerSettingStore = SinglePlayerSettingState & SinglePlayerSettingActions;

/**
 * 單人遊玩的設定狀態管理
 * @param {number} playerCount 遊玩人數
 * @param {number} underCoverCount 臥底人數
 * @param {number} whiteBoardCount 白板人數
 * @param {boolean} isOpenVoice 是否打開語音
 * @param {boolean} useTimeLimit 是否使用時間限制
 * @param {boolean} firstWhiteBoard 是否為第一個白板
 * @param {boolean} underCoverTips 是否顯示臥底提示
 * @param {number} timeLimit 時間限制
 * @param {string[]} categories 題目類別
 * @function setPlayerCount 設置遊玩人數
 * @function setUnderCoverCount 設置臥底人數
 * @function setWhiteBoardCount 設置白板人數
 * @function toggleFirstWhiteBoard 切換第一個白板
 * @function toggleTimeLimit 切換時間限制
 * @function toggleOpenVoice 切換語音
 * @function toggleUnderCoverTips 切換臥底提示
 * @function setTimeLimit 設置時間限制
 * @function setCategories 設置題目類別
 */
const useSinglePlayerSettingStore = create<SinglePlayerSettingStore>()(
  persist(
    (set) => ({
      users: [],
      playerCount: 4,
      undercoverCount: 1,
      whiteBoardCount: 0,
      isOpenVoice: false,
      useTimeLimit: false,
      firstWhiteBoard: false,
      underCoverTips: false,
      timeLimit: 0,
      categories: [],
      hasHydrated: false,
      setPlayerCount: (count) => set({ playerCount: count }),
      setUnderCoverCount: (count) => {
        set((state) => {
          const limitUnderCover = state.playerCount / 4 < 1 ? 1 : Math.floor(state.playerCount / 4);
          if (count >= limitUnderCover) {
            return { undercoverCount: limitUnderCover };
          }

          if (count < 1) {
            return { undercoverCount: 1 };
          }

          return { undercoverCount: count };
        });
      },
      setWhiteBoardCount: (count) => {
        set((state) => {
          const limitWhiteBoard = state.playerCount / 6 < 1 ? 1 : Math.floor(state.playerCount / 6);

          if (count > limitWhiteBoard) {
            return { whiteBoardCount: limitWhiteBoard };
          }

          if (count < 0) {
            return { whiteBoardCount: 0 };
          }

          return { whiteBoardCount: count };
        });
      },
      toggleFirstWhiteBoard: () => set((state) => ({ firstWhiteBoard: !state.firstWhiteBoard })),
      toggleTimeLimit: () => set((state) => ({ useTimeLimit: !state.useTimeLimit })),
      toggleOpenVoice: () => set((state) => ({ isOpenVoice: !state.isOpenVoice })),
      toggleUnderCoverTips: () => set((state) => ({ underCoverTips: !state.underCoverTips })),
      updateUser: (id, data) =>
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, ...data } : user)),
        })),

      initializeUsers: (playerCount: number) =>
        set(() => ({
          users: Array.from({ length: playerCount }, (_, index) => ({
            id: `player-${index + 1}`,
            name: `玩家 ${index + 1}`,
            role: "civilian",
            score: 0,
            audio: "",
            avatar: "/avatars/default-avatar.png",
          })),
        })),
      clearUsers: () => set(() => ({ users: [] })),
      setTimeLimit: (time: number) => {
        let limitedTime = time;
        if (time > 180) {
          limitedTime = 180;
        } else if (time < 0) {
          limitedTime = 0;
        }
        set({ timeLimit: limitedTime });
      },
      setCategories: (categories: string[]) => set({ categories }),
      setHasHydrated: (hydrated: boolean) => set({ hasHydrated: hydrated }),
    }),
    {
      name: "single-player-setting-store", // localStorage key
      onRehydrateStorage: () => (state) => {
        // 當從 localStorage 恢復狀態後，設置 hasHydrated 為 true
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useSinglePlayerSettingStore;
