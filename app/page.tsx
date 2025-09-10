import GameCard from "@/app/_components/GameCard";
import { BounceInAnimation } from "@/components/animations/BounceInAnimation";
import WrapperBox from "@/components/shared/WrapperBox";
import { MessageCircleDashed } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center bg-white/25 justify-center text-sm font-medium rounded-full px-4 py-2 mx-auto w-fit">
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <WrapperBox>
      <div className="flex items-center gap-3">
        <Image src="/logo.svg" className="h-10 md:h-32 w-auto" alt="柴題遊戲" width={114} height={114} />
        <h1 className="text-2xl md:text-7xl text-primary-text font-bold tracking-widest">柴題遊戲</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 w-full">
        <Link href="/spy-game/game-mode/single-player/setting">
          <BounceInAnimation className="group">
            <GameCard
              backgroundColor="orange"
              titleImage="/undercover.png"
              title="誰是臥底"
              description="謎底揭曉之前，永遠不要相信任何人"
            >
              <div className="flex items-center justify-center gap-3 text-sm font-medium">
                <Badge>
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span> {""}
                  語音紀錄
                </Badge>
              </div>
            </GameCard>
          </BounceInAnimation>
        </Link>

        <BounceInAnimation
          delay={0.6}
          className="group hidden md:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div className="bg-white/80 shadow text-secondary-text px-6 py-3 rounded-full font-bold text-xl">VS</div>
        </BounceInAnimation>

        <Link href="/title-generator">
          <BounceInAnimation delay={0.2} className="group">
            <GameCard
              backgroundColor="blue"
              titleImage="/draw-card.png"
              title="題目產生器"
              description="破冰遊戲沒有題目? 試試看題目產生器吧"
            >
              <div className="flex items-center justify-center gap-3 text-sm font-medium">
                <Badge>
                  <MessageCircleDashed className="w-4 h-4 mr-2 animate-pulse" />
                  解決出題困擾
                </Badge>
              </div>
            </GameCard>
          </BounceInAnimation>
        </Link>
      </div>
    </WrapperBox>
  );
}
