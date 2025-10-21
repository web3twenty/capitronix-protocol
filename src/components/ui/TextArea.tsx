import React from "react";

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  showCharCount?: boolean;
  maxLength?: number;
  resize?: "none" | "vertical" | "horizontal" | "both";
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      required,
      error,
      helperText,
      showCharCount = false,
      maxLength,
      resize = "vertical",
      className = "",
      value,
      defaultValue,
      ...rest
    },
    ref
  ) => {
    const [charCount, setCharCount] = React.useState(0);

    React.useEffect(() => {
      if (showCharCount) {
        const currentValue = value || defaultValue || "";
        setCharCount(String(currentValue).length);
      }
    }, [value, defaultValue, showCharCount]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (showCharCount) {
        setCharCount(e.target.value.length);
      }
      if (rest.onChange) {
        rest.onChange(e);
      }
    };

    const resizeStyles = {
      none: "resize-none",
      vertical: "resize-y",
      horizontal: "resize-x",
      both: "resize",
    };

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          required={required}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          className={`
            w-full px-3 py-2 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            disabled:bg-gray-100 disabled:cursor-not-allowed
            ${resizeStyles[resize]}
            ${error ? "border-red-500" : "border-gray-300"}
            ${className}
          `}
          onChange={handleChange}
          {...rest}
        />

        <div className="flex items-center justify-between mt-1">
          <div className="flex-1">
            {error && <p className="text-sm text-red-500">{error}</p>}

            {helperText && !error && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
          </div>

          {showCharCount && (
            <p className="text-sm text-gray-500 ml-2">
              {charCount}
              {maxLength && `/${maxLength}`}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
