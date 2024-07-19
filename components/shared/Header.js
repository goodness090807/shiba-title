import Image from "next/image";
import Link from "next/link";
import Navigation from "./Navigation";
import Hamburger from "./Hamburger";
import { websiteName } from "@/libs/variables";

const Header = () => {
    return (
        <header className="z-10 top-0 left-0 w-full grow-0">
            <div className="flex justify-around items-center h-28">
                <Link href={"/"} className="flex items-center w-56 gap-3 h-20">
                    <Image src={"/logo.svg"} className="max-w-full" alt={websiteName} width={64} height={64} />
                    <span className="font-bold text-2xl text-primary-text tracking-widest">{websiteName}</span>
                </Link>
                <Navigation />
                <Hamburger />
            </div>
        </header>
    );
};

export default Header;
