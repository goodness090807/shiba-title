"use client";

import { motion } from "framer-motion";

const floatAnimation = {
  x: [0, 10, -10, 0],
  y: [0, -10, 5, 0],
};

interface FloatingDecorationProps {
  children?: React.ReactNode;
  top: string;
  left: string;
}

const FloatingDecoration = ({ children, top, left }: FloatingDecorationProps) => {
  return (
    <motion.div
      className={`fixed pointer-events-none w-16 h-16 rounded-full`}
      style={{
        top: top,
        left: left,
        background: "rgba(255, 184, 77, 0.2)",
      }}
      animate={floatAnimation}
      transition={{
        duration: 6,
        ease: "easeInOut",
        repeat: Infinity,
        times: [0, 0.33, 0.66, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingDecoration;
