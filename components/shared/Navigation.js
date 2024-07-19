import Link from "next/link";
import { navigationItems } from "@/libs/variables";
import { cn } from "@/libs/utils";

const Navigation = () => {
    const linkCss = cn(
        "px-5 py-2 cursor-pointer relative",
        "text-primary-text",
        "after:transition-width after:duration-300 after:ease-in-out after:left-1/2 after:w-0",
        "after:absolute after:bottom-[-3px] after:h-[3px] after:bg-primary-text-hover",
        "hover:after:w-full hover:after:left-0"
    );

    return (
        <ul className="hidden md:flex items-center text-xl gap-5">
            {navigationItems.map((item) => {
                return (
                    <li key={item.name}>
                        <Link href={item.href} className={linkCss}>
                            {item.name}
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default Navigation;
