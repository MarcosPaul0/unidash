import { cva } from "class-variance-authority";

export const formRadioGroupVariants = cva(`flex`, {
  variants: {
    direction: {
      col: "flex-col",
      row: "flex-row",
    },
  },
  defaultVariants: {
    direction: "col",
  },
});
