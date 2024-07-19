"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdOutlineClose } from "react-icons/md";
import { usePathname } from "next/navigation";
import { cn } from "@/libs/utils";
import { navigationItems, websiteName } from "@/libs/variables";

const Hamburger = () => {
    const [open, setOpen] = useState(false);
    const pathName = usePathname();

    useEffect(() => {
        setOpen(false);
    }, [pathName]);

    const sidebarCss = cn(
        "fixed z-50 top-0 right-0 h-full w-72 bg-emphasize transition-transform h-screen p-3",
        "flex flex-col gap-5",
        {
            "translate-x-0 md:hidden": open,
            "translate-x-full": !open,
        }
    );

    const overlayCss = cn("fixed z-40 inset-0 bg-black/30 w-full h-full touch-none duration-300", {
        "md:hidden": open,
        hidden: !open,
    });

    const toggleMenu = () => {
        setOpen(!open);
    };

    const HamburgerIcon = ({ ...rest }) => {
        return (
            <div className="flex flex-col gap-1 cursor-pointer md:hidden" {...rest}>
                {Array(3)
                    .fill(true)
                    .map((_, index) => (
                        <div key={"line" + index} className="w-6 h-1 bg-emphasize-dark rounded-md"></div>
                    ))}
            </div>
        );
    };

    return (
        <>
            <HamburgerIcon onClick={toggleMenu} />
            <button className={overlayCss} onClick={() => setOpen(false)}></button>
            <div className={sidebarCss}>
                <div className="w-full h-14 mt-5 flex gap-3 justify-between items-center">
                    <Link href={"/"} className="flex gap-3 justify-between items-center">
                        <Image src={"/og-logo.png"} className="max-w-full h-12" alt={websiteName} width={48} height={45} />
                        <span className="font-bold text-2xl tracking-[0.2rem] text-white">{websiteName}</span>
                    </Link>
                    <MdOutlineClose className="text-3xl text-white" onClick={() => setOpen(false)} />
                </div>

                <ul className="h-full w-full flex flex-col items-center mt-3 text-white">
                    {navigationItems.map((item) => {
                        return (
                            <li
                                key={item.name}
                                className="w-full text-center px-3 py-7 font-bold tracking-widest text-xl border-b border-gray"
                            >
                                <Link href={item.href}>{item.name}</Link>
                            </li>
                        );
                    })}
                    <li className="w-full text-center font-bold tracking-widest mt-10 flex flex-col gap-2">
                        <span>
                            © {new Date().getFullYear()} BY {"柴娛樂沒有公司"}
                        </span>
                        <span className="text-xl">{websiteName}</span>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Hamburger;
