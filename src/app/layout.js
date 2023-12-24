import Image from "next/image";
import Script from "next/script";
import "./globals.css";

export const metadata = {
	title: "柴題遊戲",
	description: "本柴給你無限想像",
	openGraph: {
		metadataBase: new URL(process.env.WEB_BASE_PATH),
		title: "柴題遊戲",
		description: "本柴給你無限想像",
		images: [{ url: "/og-logo.png", width: 800, height: 800 }],
	},
};

export default function RootLayout({ children }) {
	return (
		<html lang="zh-Hant-TW">
			<head>
				<link rel="icon" href="/favicon.svg" />
			</head>
			<body>
				<main className="flex h-full  flex-col items-center justify-center gap-4">
					<div className="flex flex-col justify-center items-center">
						<Image
							src={"/logo-x-mas.png"}
							alt="柴犬LOGO"
							priority
							className="w-24 h-24"
							width={100}
							height={100}
						/>
						<h1 className="text-5xl font-bold text-yellow-800 tracking-widest">
							柴題遊戲
						</h1>
					</div>

					{children}
				</main>
				<Script
					async
					src="https://www.googletagmanager.com/gtag/js?id=G-5BP0T7XE29"
				></Script>
				<Script id="google-analytics">
					{`window.dataLayer = window.dataLayer || [];
					  function gtag(){dataLayer.push(arguments);}
					  gtag('js', new Date());
  					  gtag('config', 'G-5BP0T7XE29');`}
				</Script>
			</body>
		</html>
	);
}
