import { websiteName } from "@/libs/variables";

const Footer = () => {
    return (
        <footer className="w-full flex justify-center items-center text-white bg-emphasize py-3">
            <span>
                © {new Date().getFullYear()} BY {"柴娛樂沒有公司"} - {websiteName}
            </span>
        </footer>
    );
};

export default Footer;
