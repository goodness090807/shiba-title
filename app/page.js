import Image from "next/image";
import Link from "next/link";
import { MdLightbulbOutline } from "react-icons/md";
import SwingingItem from "@/components/animations/SwingingItem";
import PowerButton from "@/components/animations/PowerButton";

export default function Home() {
    return (
        <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-col items-center w-[350px] md:w-[450px] bg-white/30 shadow-2xl rounded-2xl p-5">
                <SwingingItem>
                    <Image src="/logo.svg" alt="柴題遊戲" className="my-5" width={128} height={128} />
                </SwingingItem>
                <h1 className="text-4xl text-primary-text font-bold tracking-widest drop-shadow-lg my-5">柴題遊戲</h1>
                <h2 className="text-secondary-text text-center text-lg tracking-widest">產生遊戲題目的最佳助手</h2>
                <Link href="/title-generator">
                    <PowerButton>
                        <span className="flex items-center gap-3">
                            <MdLightbulbOutline className="text-2xl" />
                            開始產生題目
                        </span>
                    </PowerButton>
                </Link>
                <Link
                    href="/illustrate"
                    className="text-primary-text text-md border-b border-primary-text tracking-widest pb-1 hover:text-primary-text-hover"
                >
                    說明
                </Link>
            </div>
        </main>
    );
}
