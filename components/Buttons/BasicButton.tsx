import { cn } from "@/libs/utils";

const BasicButton = ({
  onClick,
  children,
  className,
  disabled,
}: {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex gap-2 text-white bg-emphasize-dark rounded-2xl px-5 py-3 cursor-pointer",
        "disabled:opacity-50",
        className,
        { "cursor-not-allowed": disabled }
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default BasicButton;
