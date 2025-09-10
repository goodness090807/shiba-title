import { api } from "@/libs/axios";
import { SpyGameTitle, Title } from "@/types/titles";

export const titlesAPI = {
  getRandomOneTitle: async () => {
    const response = await api.get<Title>("/titles/random");
    return response.data;
  },
  getSpyGameTitles: async () => {
    const response = await api.get<SpyGameTitle>("/titles/spy-game-titles");
    return response.data;
  },
};
