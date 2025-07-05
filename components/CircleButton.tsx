const CircleButton = ({
  children,
  onClick,
  title,
  ...props
}: Readonly<{ children: React.ReactNode; onClick?: () => void; title?: string }>) => {
  return (
    <button
      className="bg-primary-text text-white text-2xl rounded-full w-16 h-16 flex items-center justify-center 
                        hover:bg-primary-text-hover"
      onClick={onClick}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
};

export default CircleButton;
