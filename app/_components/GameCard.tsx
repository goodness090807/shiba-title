import SwingingItem from "@/components/animations/SwingingItem";
import { cn } from "@/libs/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

interface GameCardProps {
  children: React.ReactNode;
  titleImage: string;
  title: string;
  description: string;
  backgroundColor?: GameCardBackgroundColor;
}

type GameCardBackgroundColor = "orange" | "blue";

const colorClasses: Record<GameCardBackgroundColor, string> = {
  orange: "from-[#FF6B35] to-[#ff8e52]",
  blue: "from-[#4ecdc4] to-[#44a3aa]",
};

const GameCard = ({ children, titleImage, title, description, backgroundColor }: GameCardProps) => {
  const cardStyle = cn(
    "w-full relative overflow-hidden p-4 py-6",
    "flex flex-col items-center justify-center gap-2 md:gap-4",
    "bg-linear-135 backdrop-blur-md",
    "shadow-2xl rounded-3xl",
    "cursor-pointer text-white",
    colorClasses[backgroundColor ?? "orange"]
  );

  const linkStyle = cn(
    "px-5 py-2 cursor-pointer relative",
    "after:transition-width after:duration-300 after:ease-in-out after:left-0 after:w-0",
    "after:absolute after:bottom-[-3px] after:h-[3px] after:bg-white",
    "group-hover:after:w-full"
  );

  return (
    <div className={cardStyle}>
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mb-16"></div>

      <SwingingItem>
        <Image src={titleImage} className="h-16 w-auto md:h-32" alt="柴題遊戲" width={128} height={128} />
      </SwingingItem>
      <h3 className="text-2xl md:text-5xl font-bold tracking-widest">{title}</h3>
      <p>{description}</p>
      {children}

      <div className={`flex items-center justify-center ${linkStyle}`}>
        <span className="text-sm md:text-lg font-medium">
          開始遊戲 <ArrowRight className="inline-block" />
        </span>
      </div>
    </div>
  );
};

export default GameCard;
