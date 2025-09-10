"use client";

import { cn } from "@/libs/utils";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { create } from "zustand";

type ToastType = "success" | "error";
type ToastPosition = "top-center" | "top-right" | "top-left" | "bottom-center" | "bottom-right" | "bottom-left";

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastStore {
  toasts: Toast[];
  position: ToastPosition;
  maxToasts: number;
  addToast: (toast: Omit<Toast, "id">) => string;
  removeToast: (id: string) => void;
  clearAllToasts: () => void;
  updatePosition: (position: ToastPosition) => void;
  updateMaxToasts: (max: number) => void;
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],
  position: "top-center",
  maxToasts: 5,

  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const newToast: Toast = { ...toast, id };

    set((state) => {
      const updatedToasts = [...state.toasts, newToast];
      // 限制最大顯示數量
      return {
        toasts: updatedToasts.slice(-state.maxToasts),
      };
    });

    // 自動移除
    if (toast.duration !== 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, toast.duration || 5000);
    }

    return id;
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    }));
  },

  clearAllToasts: () => {
    set({ toasts: [] });
  },

  updatePosition: (position) => {
    set({ position });
  },

  updateMaxToasts: (maxToasts) => {
    set((state) => ({
      maxToasts,
      toasts: state.toasts.slice(-maxToasts),
    }));
  },
}));

// ==================== Toast Item Component ====================
const ToastItem: React.FC<{
  toast: Toast;
  onClose: () => void;
  isTop: boolean;
  index: number;
}> = ({ toast, onClose, isTop, index }) => {
  const styles: Record<ToastType, { bg: string; text: string; description: string; border: string }> = {
    success: {
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-900",
      description: "text-green-700",
    },
    error: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-900",
      description: "text-red-700",
    },
  };

  const currentStyle = styles[toast.type];

  return (
    <motion.div
      layout
      initial={{
        opacity: 0,
        y: isTop ? -20 : 20,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      exit={{
        opacity: 0,
        x: 100,
        scale: 0.95,
        transition: { duration: 0.2 },
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
        delay: index * 0.05,
      }}
      className={cn(
        "relative w-full min-w-[280px] sm:min-w-[320px] max-w-md",
        "p-4 pr-10 rounded-lg shadow-lg border backdrop-blur-sm",
        "bg-white/95",
        currentStyle.bg,
        currentStyle.border
      )}
    >
      <div className="flex gap-3">
        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className={cn("text-sm font-medium break-words", currentStyle.text)}>{toast.message}</p>

          {toast.description && (
            <p className={cn("mt-1 text-sm break-words", currentStyle.description)}>{toast.description}</p>
          )}

          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                onClose();
              }}
              className={cn(
                "mt-2 text-sm font-medium underline",
                "hover:no-underline transition-all",
                "focus:outline-none focus:ring-2 focus:ring-offset-1 rounded",
                currentStyle.text
              )}
            >
              {toast.action.label}
            </button>
          )}
        </div>
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        className={cn(
          "absolute top-3 right-3",
          "p-1 rounded-md transition-colors",
          "hover:bg-black/5",
          "focus:outline-none focus:ring-2 focus:ring-offset-1",
          {
            "focus:ring-green-500": toast.type === "success",
            "focus:ring-red-500": toast.type === "error",
          }
        )}
        aria-label="關閉通知"
      >
        <X className={cn("w-4 h-4", currentStyle.text)} />
      </button>
    </motion.div>
  );
};

export const Toastr: React.FC = () => {
  const { toasts, removeToast, position } = useToastStore();

  const positionClasses: Record<ToastPosition, string> = {
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  };

  const isTop = position.includes("top");

  return (
    <div
      className={cn(
        "fixed z-[9999] flex flex-col gap-2 pointer-events-none",
        "px-4 sm:px-0", // 手機版左右留白
        "w-full sm:w-auto max-w-[calc(100vw-2rem)] sm:max-w-md",
        positionClasses[position]
      )}
      aria-live="polite"
      aria-atomic="true"
    >
      <AnimatePresence mode="sync">
        {toasts.map((toast, index) => (
          <div key={toast.id} className="pointer-events-auto">
            <ToastItem toast={toast} onClose={() => removeToast(toast.id)} isTop={isTop} index={index} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export const useToast = () => {
  const { addToast, removeToast, clearAllToasts } = useToastStore();

  return {
    toast: {
      success: (message: string, options?: Partial<Omit<Toast, "id" | "type" | "message">>) =>
        addToast({ type: "success", message, ...options }),

      error: (message: string, options?: Partial<Omit<Toast, "id" | "type" | "message">>) =>
        addToast({ type: "error", message, ...options }),

      custom: (toast: Omit<Toast, "id">) => addToast(toast),

      dismiss: (id: string) => removeToast(id),

      dismissAll: () => clearAllToasts(),
    },
  };
};
