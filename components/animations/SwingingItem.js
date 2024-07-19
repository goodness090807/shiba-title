"use client";

import { motion } from "framer-motion";

const SwingingItem = ({ children }) => {
    return (
        <motion.div
            animate={{
                y: [-0, -10, 0],
            }}
            transition={{
                duration: 4,
                times: [0, 0.5, 1],
                repeat: Infinity,
                ease: "easeInOut",
            }}
        >
            {children}
        </motion.div>
    );
};

export default SwingingItem;
