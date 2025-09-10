"use client";

import { Home } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TopicBoard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg h-[80vh] md:h-full w-[90dvw] aspect-video py-3 flex flex-col items-center gap-4">
      <div className="px-3 py-1 w-full flex items-center gap-2 justify-between backdrop-blur-md rounded-t-lg">
        <Link href="/" className="flex items-center gap-2 text-primary-text font-bold tracking-widest">
          <Image src="/logo.svg" className="h-10 md:h-14 w-auto" alt="柴題遊戲" width={114} height={114} />
          <span className="md:text-4xl">柴題遊戲</span>
        </Link>
        <Link href="/" className="text-emphasize-dark font-bold tracking-widest flex gap-1 items-center">
          <Home className="w-6 h-6 md:w-10 md:h-10 text-primary-text" />
        </Link>
      </div>

      {children}
    </div>
  );
};

export default TopicBoard;
