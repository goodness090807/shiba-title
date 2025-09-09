export interface IUser {
  id: string;
  name: string;
  score: number;
  avatar: string;
  audio: string;
  role: "undercover" | "whiteboard" | "civilian";
}

export const roleNames: { [key in IUser["role"]]: string } = {
  undercover: "臥底",
  whiteboard: "白板",
  civilian: "平民",
};
