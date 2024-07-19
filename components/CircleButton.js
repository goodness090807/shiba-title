const CircleButton = ({ children, ...props }) => {
    return (
        <button
            className="bg-primary-text text-white text-2xl rounded-full w-16 h-16 flex items-center justify-center 
                        hover:bg-primary-text-hover"
            {...props}
        >
            {children}
        </button>
    );
};

export default CircleButton;
