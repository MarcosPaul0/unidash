import * as React from "react";

import { cn } from "@unidash/lib/cn";
import { LinkButtonProps } from "./linkButton.interface";
import Link from "next/link";
import { linkButtonVariants } from "./linkButton.constant";

export function LinkButton({
  className,
  variant,
  size,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(linkButtonVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </Link>
  );
}
