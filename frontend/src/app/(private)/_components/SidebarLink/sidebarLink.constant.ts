import { cva } from "class-variance-authority";

export const sidebarLinkVariants = cva(
  `rounded-lg w-full text-button-foreground flex items-center
  gap-2 hover:bg-primary `,
  {
    variants: {
      variant: {
        unselected: "bg-transparent",
        selected: "bg-primary",
        disabled: "opacity-40 pointer-events-none",
      },
      size: {
        md: "py-2 px-4 text-base",
        sm: "py-2 px-4 text-sm",
      },
    },
    defaultVariants: {
      variant: "unselected",
      size: "md",
    },
  }
);
