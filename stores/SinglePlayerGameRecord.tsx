import { IUser } from "@/types/users";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SinglePlayerGameRecordState {
  users: IUser[];
  defaultUsers: IUser[];
  started: boolean;
  title: string;
  titleImg: string;
  undercoverTitle: string;
  undercoverTitleImg: string;
  round: number;
  roundEnd: boolean;
  // 目前回答玩家
  currentPlayer: number;
  // hasHydrated 用來標記是否已經從持久化存儲中恢復狀態
  hasHydrated: boolean;
}

interface SinglePlayerGameRecordActions {
  addUser: (user: IUser) => void;
  removeUser: (id: string) => void;
  startGame: (
    settingUsers: IUser[],
    undercoverCount: number,
    whiteBoardCount: number,
    title: string,
    titleImg: string,
    undercoverTitle: string,
    undercoverTitleImg: string
  ) => void;
  endGame: () => void;
  nextTurn: () => void;
  nextRound: () => void;
  setUserAudio: (id: string, audio: string) => void;
  setHasHydrated: (hydrated: boolean) => void;
}

type SinglePlayerGameRecordStore = SinglePlayerGameRecordState & SinglePlayerGameRecordActions;

const useSinglePlayerGameRecordStore = create<SinglePlayerGameRecordStore>()(
  persist(
    (set) => ({
      users: [],
      defaultUsers: [],
      started: false,
      title: "",
      titleImg: "",
      undercoverTitle: "",
      undercoverTitleImg: "",
      round: 1,
      currentPlayer: 0,
      hasHydrated: false,
      roundEnd: false,
      addUser: (user) => set((state) => ({ users: [...state.users, user] })),
      removeUser: (id) => set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
      startGame: (
        settingUsers: IUser[],
        undercoverCount: number,
        whiteBoardCount: number,
        title: string,
        titleImg: string,
        undercoverTitle: string,
        undercoverTitleImg: string
      ) => {
        const newUsers = settingUsers.map((user) => ({ ...user }));
        // 使用 Fisher-Yates 洗牌算法優化隨機選擇
        const userIndexes = Array.from({ length: newUsers.length }, (_, i) => i);
        for (let i = userIndexes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [userIndexes[i], userIndexes[j]] = [userIndexes[j], userIndexes[i]];
        }

        // 將選中的索引排序後設置臥底
        const selectedIndexes = userIndexes.slice(0, undercoverCount).sort((a, b) => a - b);
        selectedIndexes.forEach((index) => {
          newUsers[index].role = "undercover";
        });

        // 找出非臥底玩家的索引
        const nonUndercoverIndexes = userIndexes.slice(undercoverCount);

        // 將選中的索引排序後設置根據白板玩家
        const whiteBoardIndexes = nonUndercoverIndexes.slice(0, whiteBoardCount).sort((a, b) => a - b);
        whiteBoardIndexes.forEach((index) => {
          newUsers[index].role = "whiteboard";
        });

        // 從api取得遊戲的標題和臥底詞
        set((state) => ({
          ...state,
          started: true,
          roundEnd: false,
          title: title,
          titleImg: titleImg,
          undercoverTitle: undercoverTitle,
          undercoverTitleImg: undercoverTitleImg,
          round: 1,
          currentPlayer: 0,
          users: newUsers,
          defaultUsers: newUsers,
        }));
      },
      endGame: () => set(() => ({ started: false })),
      nextTurn: () =>
        set((state) => ({
          currentPlayer: state.currentPlayer + 1,
          roundEnd: state.currentPlayer + 1 >= state.users.length,
        })),
      nextRound: () =>
        set((state) => ({
          round: state.round + 1,
          roundEnd: false,
          currentPlayer: 0,
        })),
      setUserAudio: (id: string, audio: string) => {
        set((state) => ({
          users: state.users.map((user) => (user.id === id ? { ...user, audio } : user)),
        }));
      },
      setHasHydrated: (hydrated: boolean) => set({ hasHydrated: hydrated }),
    }),
    {
      name: "single-player-game-record", // storage key
      // You can add getStorage, serialize, deserialize options if needed
      onRehydrateStorage: () => (state) => {
        // 當從 localStorage 恢復狀態後，設置 hasHydrated 為 true
        state?.setHasHydrated(true);
      },
    }
  )
);

export default useSinglePlayerGameRecordStore;
