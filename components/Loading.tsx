export default function Loading({ title }: Readonly<{ title?: string }>) {
  return (
    <div className="text-center">
      {title && <span className="font-bold text-yellow-600 text-xl">{title}</span>}
      <div className="w-[300px] h-[350px] bg-[url('/loading.png')] animate-[loading_0.5s_steps(2)_infinite_alternate]"></div>
    </div>
  );
}
