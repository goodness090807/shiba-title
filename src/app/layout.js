import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";

const title = "柴題遊戲";
const description =
    "歡迎來到柴題遊戲，這是一款結合AI圖片生成所創造的柴犬主題桌遊，這款遊戲是朋友聚會的好選擇，它提供無限的樂趣和驚喜。通過我們的隨機題目產生器，每次遊戲都會帶來不一樣的體驗，不管是桌遊愛好者或是柴犬迷，都能在這裡找到歡笑和挑戰。快來體驗，與朋友共同創造難忘的遊戲時光吧！";
const image = `${process.env.WEB_BASE_PATH}/og-logo.png`;

export const metadata = {
    title: title,
    description: description,
    openGraph: {
        metadataBase: new URL(process.env.WEB_BASE_PATH),
        title: title,
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
    src: "../../public/fonts/jf-openhuninn-2.0.woff2",
    display: "swap",
});

export default function RootLayout({ children }) {
    return (
        <html lang="zh-Hant-TW" className={`flex justify-center items-center ${openhuninnFont.className}`}>
            <head>
                <link rel="icon" href={image} />
                <link rel="shortcut icon" href={image} />
                <link rel="apple-touch-icon" href={image} />
                <meta name="robots" content="index, follow" />
                <meta name="author" content="Terry TSAI" />
                <meta name="google-adsense-account" content="ca-pub-5523297186661757" />
            </head>

            {/* Google Tag Manager */}
            <Script id="google-tag-manager">
                {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
					new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
					j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
					'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
					})(window,document,'script','dataLayer','GTM-NK9KP6BR');`}
            </Script>
            {/* End Google Tag Manager */}
            <Script
                id="google-syndication"
                crossOrigin="anonymous"
                async
                src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5523297186661757"
            ></Script>
            <body>
                {/* <!-- Google Tag Manager (noscript) --> */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-NK9KP6BR"
                        height="0"
                        width="0"
                        style={{ display: "none", visibility: "hidden" }}
                    ></iframe>
                </noscript>
                {/* <!-- End Google Tag Manager (noscript) --> */}
                <main className="flex min-h-full flex-col items-center justify-center gap-4">{children}</main>
            </body>
        </html>
    );
}
