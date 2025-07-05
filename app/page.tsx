import { BounceInAnimation } from "@/components/animations/BounceInAnimation";
import SwingingItem from "@/components/animations/SwingingItem";
import GameCard from "@/components/Cards/GameCard";
import { cn } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight, FaGamepad } from "react-icons/fa";
import { TbDeviceGamepad3, TbPlayCard } from "react-icons/tb";

const linkStyle = cn(
  "px-5 py-2 cursor-pointer relative",
  "after:transition-width after:duration-300 after:ease-in-out after:left-0 after:w-0",
  "after:absolute after:bottom-[-3px] after:h-[3px] after:bg-white",
  "group-hover:after:w-full"
);

const Badge = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center bg-white/25 justify-center text-sm font-medium rounded-full px-4 py-2 mx-auto w-fit">
      {children}
    </div>
  );
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-3 w-full max-w-7xl mx-auto my-3">
      <div className="flex items-center justify-center gap-3 py-3">
        <Image src="/logo.svg" alt="柴題遊戲" width={114} height={114} />
        <h1 className="text-5xl md:text-7xl text-primary-text font-bold tracking-widest">柴題遊戲</h1>
      </div>

      <h2 className="text-primary-text text-xl tracking-widest">✨ 破冰遊戲最佳幫手 ✨</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full p-5">
        <BounceInAnimation className="group">
          <GameCard backgroundColor="orange">
            <SwingingItem>
              <Image src="/Undercover.png" alt="柴題遊戲" width={128} height={128} />
            </SwingingItem>
            <h3 className="text-5xl md:text-5xl font-bold tracking-widest">誰柴是臥底</h3>
            <p>謎底揭曉之前，永遠不要相信任何人</p>

            <div className="flex items-center justify-center gap-3 text-sm font-medium">
              <Badge>
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span> {""}
                線上分配牌組
              </Badge>
              <Badge>
                <FaGamepad className="w-4 h-4 mr-2 animate-pulse" />
                誰是臥底遊戲玩法
              </Badge>
            </div>

            <div className={`flex items-center justify-center ${linkStyle}`}>
              <span className="text-lg font-medium">
                開始遊戲 <FaArrowRight className="inline-block ml-1" />
              </span>
            </div>
          </GameCard>
        </BounceInAnimation>

        <BounceInAnimation
          delay={0.6}
          className="group hidden md:flex items-center justify-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
        >
          <div className="bg-white/80 shadow text-secondary-text px-6 py-3 rounded-full font-bold text-xl">VS</div>
        </BounceInAnimation>

        <Link href="/title-generator">
          <BounceInAnimation delay={0.2} className="group">
            <GameCard backgroundColor="blue">
              <SwingingItem>
                <Image src="/DrawCard.png" alt="柴題遊戲" className="h-32 w-auto" width={128} height={128} />
              </SwingingItem>
              <h3 className="text-5xl md:text-5xl font-bold tracking-widest text-center">題目產生器</h3>
              <p>破冰遊戲沒有題目? 試試看題目產生器吧</p>

              <div className="flex items-center justify-center gap-3 text-sm font-medium">
                <Badge>
                  <TbPlayCard className="w-4 h-4 mr-2 animate-pulse" />
                  解決出題困擾
                </Badge>
                <Badge>
                  <TbDeviceGamepad3 className="w-4 h-4 mr-2 animate-pulse" />
                  多種出題模式
                </Badge>
              </div>
              <div className={`flex items-center justify-center ${linkStyle}`}>
                <span className="text-lg font-medium">
                  開始產生題目 <FaArrowRight className="inline-block ml-1" />
                </span>
              </div>
            </GameCard>
          </BounceInAnimation>
        </Link>
      </div>
    </main>
  );
}
