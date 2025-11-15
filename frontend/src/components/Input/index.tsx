import { cn } from "@unidash/lib/cn";
import { InputProps } from "./input.interface";

function Input({ className, type, icon, ...props }: InputProps) {
  if (icon) {
    return (
      <div
        className={cn(
          `
            flex items-center gap-2 border border-border-input px-3 h-12
            rounded-xl shadow-xs has-[:focus-visible]:ring-[3px] bg-input
            has-[:focus-visible]:border-ring has-[:focus-visible]:ring-ring/50
          `,
          className
        )}
      >
        {icon}

        <input
          type={type}
          data-slot="input"
          className={cn(
            "file:text-foreground placeholder:text-muted-foreground selection:bg-primary",
            "selection:text-primary-foreground dark:bg-input/30 flex w-full bg-input",
            "min-w-0 text-base disabled:cursor-not-allowed disabled:opacity-50",
            "transition-[color,box-shadow] outline-none file:inline-flex file:border-0",
            "file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
          )}
          {...props}
        />
      </div>
    );
  }

  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary",
        "selection:text-primary-foreground dark:bg-input/30 border-border-input flex w-full",
        "min-w-0 rounded-xl border bg-transparent px-3 h-12 text-base shadow-xs",
        "transition-[color,box-shadow] outline-none file:inline-flex file:border-0",
        "file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none",
        "disabled:cursor-not-allowed disabled:opacity-50 bg-input",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  );
}

export { Input };
