import { cn } from "@/libs/utils";

interface GameCardProps {
  children: React.ReactNode;
  backgroundColor?: GameCardBackgroundColor;
}

type GameCardBackgroundColor = "orange" | "blue";

const colorClasses: Record<GameCardBackgroundColor, string> = {
  orange: "from-[#FF6B35] to-[#ff8e52]",
  blue: "from-[#4ecdc4] to-[#44a3aa]",
};

const GameCard = ({ children, backgroundColor }: GameCardProps) => {
  const cardStyle = cn(
    "w-full relative overflow-hidden p-4 py-8",
    "flex flex-col items-center justify-center gap-4",
    "bg-linear-135 backdrop-blur-md",
    "shadow-2xl rounded-3xl",
    "cursor-pointer text-white",
    colorClasses[backgroundColor ?? "orange"]
  );

  return (
    <div className={cardStyle}>
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>
      {children}
    </div>
  );
};

export default GameCard;
