import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      required,
      icon,
      error,
      helperText,
      type = "text",
      className = "",
      ...rest
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-300 mb-1">
            {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
        )}

        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            required={required}
            type={isPassword ? (showPassword ? "text" : "password") : type}
            className={`
              w-full px-3 py-2 rounded-lg
              bg-[#25262A] text-gray-100
              border border-[#666666]
              focus:outline-none focus:ring-2 focus:ring-[#bfa30a] focus:border-transparent
              disabled:bg-[#44454a] disabled:cursor-not-allowed placeholder:text-[#5E6064]
              ${icon ? "pl-10" : ""}
              ${isPassword ? "pr-10" : ""}
              ${error ? "border-red-500" : ""}
              ${className}
            `}
            {...rest}
          />

          {isPassword && (
            <div
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </div>
          )}
        </div>

        {error && <p className="mt-1 text-sm text-red-400">{error}</p>}

        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-400">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
