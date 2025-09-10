import Loading from "@/components/Loading";

const RoomLoading = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
      <span className="font-bold text-yellow-600 text-xl mx-3">{children}</span>
      <Loading />
    </main>
  );
};
export default RoomLoading;
