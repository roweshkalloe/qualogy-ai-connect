import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  label: string;
  onChange?: (value: string) => void;
  showPasswordToggle?: boolean;
}

const FloatingInput = React.forwardRef<HTMLInputElement, FloatingInputProps>(
  ({ id, label, type = "text", value, onChange, showPasswordToggle, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [internalValue, setInternalValue] = useState("");
    
    const currentValue = value !== undefined ? value : internalValue;
    const isActive = isFocused || String(currentValue).length > 0;

    const inputType = showPasswordToggle
      ? showPassword
        ? "text"
        : "password"
      : type;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      if (value === undefined) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    };

    return (
      <div className="relative">
        <input
          id={id}
          ref={ref}
          type={inputType}
          value={currentValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full h-14 px-4 pt-4 pb-2",
            "bg-transparent",
            "border-2 rounded-xl",
            "text-foreground text-base",
            "outline-none",
            "transition-all duration-200",
            isFocused
              ? "border-primary ring-2 ring-primary/20"
              : "border-border hover:border-muted-foreground/50",
            showPasswordToggle && "pr-12",
            className
          )}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute left-4",
            "transition-all duration-200",
            "pointer-events-none",
            isActive
              ? "-top-2.5 text-xs bg-card px-1 text-primary font-medium"
              : "top-1/2 -translate-y-1/2 text-muted-foreground text-base"
          )}
        >
          {label}
        </label>
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
    );
  }
);

FloatingInput.displayName = "FloatingInput";

export { FloatingInput };
