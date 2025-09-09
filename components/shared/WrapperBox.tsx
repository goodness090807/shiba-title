import { cn } from "@/libs/utils";
import React from "react";

const WrapperBox = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-5 w-full mx-auto my-2 p-2 md:p-5 bg-white/70 rounded-md z-10",
        className
      )}
    >
      {children}
    </div>
  );
};

export default WrapperBox;
