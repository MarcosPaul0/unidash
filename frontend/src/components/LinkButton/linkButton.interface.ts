import { VariantProps } from "class-variance-authority";
import { LinkProps } from "next/link";
import { linkButtonVariants } from "./linkButton.constant";
import { ReactNode } from "react";

export interface LinkButtonProps
  extends LinkProps,
    VariantProps<typeof linkButtonVariants> {
  className?: string;
  children: ReactNode;
}
