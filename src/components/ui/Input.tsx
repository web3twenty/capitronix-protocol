import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  required?: boolean;
  icon?: React.ReactNode;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { label, required, icon, error, helperText, className = "", ...rest },
    ref
  ) => {
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
            className={`
              w-full px-3 py-2 rounded-lg
              bg-[#25262A] text-gray-100
              border border-[#666666]
              focus:outline-none focus:ring-2 focus:ring-[#E6B800] focus:border-transparent
              disabled:bg-[#2f3035] disabled:cursor-not-allowed
              ${icon ? "pl-10" : ""}
              ${error ? "border-red-500" : ""}
              ${className}
            `}
            {...rest}
          />
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
