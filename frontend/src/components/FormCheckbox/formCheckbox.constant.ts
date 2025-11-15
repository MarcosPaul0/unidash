import { cva } from "class-variance-authority";

export const formCheckboxVariants = cva(`flex flex-col md:grid gap-8 w-full`, {
  variants: {
    cols: {
      four: "grid-cols-4",
      three: "grid-cols-3",
    },
  },
  defaultVariants: {
    cols: "four",
  },
});
