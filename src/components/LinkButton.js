import Link from "next/link";

export default function LinkButton({ href, children }) {
	return (
		<Link
			className="text-white bg-yellow-800 rounded-lg px-5 font-bold text-2xl tracking-widest py-3 w-40 
                        flex items-center justify-center hover:bg-yellow-700"
			href={href}
		>
			{children}
		</Link>
	);
}
