import Image from "next/image";

export default function GameTitle({ title }) {
	return (
		<div className="flex justify-center items-center">
			<Image
				src={"/logo.svg"}
				alt="柴犬LOGO"
				priority
				className="w-24 h-24"
				width={100}
				height={100}
			/>
			<h1 className="text-5xl font-bold text-yellow-800 tracking-widest">
				{title}
			</h1>
		</div>
	);
}
