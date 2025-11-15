import { ComponentProps, ReactNode } from "react";

export interface InputProps extends ComponentProps<"input"> {
  icon?: ReactNode;
}
