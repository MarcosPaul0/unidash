import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap font-text
  rounded-xl text-base transition-all disabled:pointer-events-none font-semibold
  disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-6
  shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring 
  focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 
  dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer`,
  {
    variants: {
      variant: {
        default:
          "bg-primary text-button-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "bg-ghost/10 hover:bg-ghost/20 text-ghost-foreground dark:hover:bg-ghost/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "px-5 py-3",
        sm: "rounded-md gap-1.5 px-3",
        lg: "rounded-md px-6 py-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);
