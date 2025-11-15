import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "@unidash/lib/cn";
import { buttonVariants } from "./button.constant";
import { ButtonProps } from "./button.interface";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr";

function Button({
  className,
  variant,
  size,
  children,
  isLoading = false,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <CircleNotchIcon weight="bold" className="animate-spin size-6" />
      ) : (
        children
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
