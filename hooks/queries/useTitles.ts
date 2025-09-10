import { titlesAPI } from "@/apis/titles";
import { useQuery } from "@tanstack/react-query";

export const useRandomOneTitle = () => {
  return useQuery({
    queryKey: ["randomOneTitle"],
    queryFn: titlesAPI.getRandomOneTitle,
  });
};

export const useSpyGameTitles = () => {
  return useQuery({
    queryKey: ["spyGameTitles"],
    queryFn: titlesAPI.getSpyGameTitles,
  });
};
