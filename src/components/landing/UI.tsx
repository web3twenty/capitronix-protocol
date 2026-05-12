import { ReactNode } from "react";
import { motion } from "motion/react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: (e?: any) => void;
  id?: string;
  type?: "button" | "submit" | "reset";
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  id,
  type = "button",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variants = {
    primary:
      "bg-gradient-to-r from-cyan-400 to-blue-600 text-white hover:from-cyan-500 hover:to-blue-700 shadow-lg shadow-blue-500/20",
    secondary: "bg-slate-900 text-white hover:bg-slate-800 shadow-md",
    outline: "border-2 border-cyan-400 text-cyan-500 hover:bg-cyan-50",
    ghost: "text-slate-500 hover:text-slate-900 hover:bg-slate-100",
  };

  const sizes = {
    sm: "px-4 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      id={id}
      type={type}
    >
      {children}
    </motion.button>
  );
}

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
  key?: number | string;
}

export function Card({ children, className = "", onClick, id }: CardProps) {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`bg-white border border-slate-200 rounded-3xl p-6 hover:border-cyan-400 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
}

export function Badge({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <span
      id={id}
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-50 text-cyan-700 border border-cyan-200 ${className}`}
    >
      {children}
    </span>
  );
}
