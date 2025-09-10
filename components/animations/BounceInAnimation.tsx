"use client";

import { motion } from "framer-motion";

export const BounceInAnimation = ({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const bounceVariants = {
    hidden: {
      opacity: 0,
      scale: 0.7,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 10,
        stiffness: 150,
        delay: delay,
        duration: 0.4,
        ease: "easeOut" as const,
        opacity: {
          delay: delay,
          duration: 0.2,
        },
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={bounceVariants}
      initial="hidden"
      animate="visible"
      whileHover={"hover"}
      whileTap={"tap"}
    >
      {children}
    </motion.div>
  );
};
