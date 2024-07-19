import localFont from "next/font/local";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import { websiteName } from "@/libs/variables";
import { cn } from "@/libs/utils";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const description =
    "歡迎來到柴題遊戲，這是一款結合AI圖片生成所創造的柴犬主題桌遊，這款遊戲是朋友聚會的好選擇，它提供無限的樂趣和驚喜。通過我們的隨機題目產生器，每次遊戲都會帶來不一樣的體驗，不管是桌遊愛好者或是柴犬迷，都能在這裡找到歡笑和挑戰。快來體驗，與朋友共同創造難忘的遊戲時光吧！";
const image = `${process.env.WEB_BASE_PATH}//og-logo.png`;

export const metadata = {
    metadataBase: new URL(process.env.WEB_BASE_PATH),
    title: websiteName,
    description: description,
    robots: "index, follow",
    authors: [{ name: "柴娛樂沒有公司", url: process.env.WEB_BASE_PATH }],
    icons: {
        icon: image,
        apple: image,
    },
    openGraph: {
        title: websiteName,
        description: description,
        url: process.env.WEB_BASE_PATH,
        type: "website",
        images: [
            {
                url: image,
                width: 800,
                height: 800,
            },
        ],
    },
};

const openhuninnFont = localFont({
    src: "../public/fonts/jf-openhuninn-2.0.woff2",
    display: "swap",
});

export default function RootLayout({ children }) {
    const bodyCss = cn("h-full", openhuninnFont.className);
    return (
        <html lang="zh-Hant-TW" className="h-full">
            <head>
                <link rel="shortcut icon" href={image} />
            </head>

            <GoogleTagManager gtmId="GTM-NK9KP6BR" />

            <body className={bodyCss}>
                <div className="min-h-full flex flex-col bg-gradient-to-br from-dark to-light">
                    <Header />
                    <div className="flex-1">{children}</div>
                    <Footer />
                </div>
            </body>
        </html>
    );
}
