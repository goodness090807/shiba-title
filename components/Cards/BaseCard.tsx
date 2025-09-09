const BaseCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative bg-white shadow text-secondary-text p-3 rounded-xl text-xl font-bold flex flex-col items-center gap-1">
      {children}
    </div>
  );
};

export default BaseCard;
