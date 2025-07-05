import Link from "next/link";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function LinkButton({ href, children }: Readonly<LinkButtonProps>) {
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
