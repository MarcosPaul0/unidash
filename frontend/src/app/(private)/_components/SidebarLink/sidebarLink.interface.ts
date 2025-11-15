import { VariantProps } from "class-variance-authority";
import { LinkProps } from "next/link";
import { ReactNode } from "react";
import { sidebarLinkVariants } from "./sidebarLink.constant";

export interface SidebarLinkProps
  extends LinkProps,
    VariantProps<typeof sidebarLinkVariants> {
  text: string;
  icon?: ReactNode;
  className?: string;
}
