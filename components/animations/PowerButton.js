"use client";

import { motion } from "framer-motion";

const PowerButton = ({ children }) => {
    return (
        <div className="container mx-auto px-4 my-6 text-center">
            <motion.button
                animate={{
                    scale: [1, 1.05, 1],
                }}
                transition={{
                    duration: 2,
                    times: [0, 0.5, 1],
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="bg-emphasize w-auto text-white font-bold py-3 px-6 rounded-full text-lg shadow-round shadow-emphasize-dark transition-colors duration-300"
            >
                {children}
            </motion.button>
        </div>
    );
};

export default PowerButton;
