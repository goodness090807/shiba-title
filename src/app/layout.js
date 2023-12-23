import Image from "next/image";
import "./globals.css";

export const metadata = {
	title: "柴題產生器",
	description: "本柴給你無限的靈感",
	openGraph: {
		title: "柴題產生器",
		description: "本柴給你無限的靈感",
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
							src={"/logo.svg"}
							alt="柴犬LOGO"
							priority
							className="w-24 h-24"
							width={100}
							height={100}
						/>
						<h1 className="text-5xl font-bold text-yellow-800 tracking-widest">
							柴題產生器
						</h1>
					</div>

					{children}
				</main>
			</body>
		</html>
	);
}
