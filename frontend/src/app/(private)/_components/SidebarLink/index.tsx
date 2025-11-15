"use client";

import Link from "next/link";
import { SidebarLinkProps } from "./sidebarLink.interface";
import { cn } from "@unidash/lib/cn";
import { usePathname } from "next/navigation";
import { sidebarLinkVariants } from "./sidebarLink.constant";

export function SidebarLink({
  icon,
  text,
  size,
  className,
  variant,
  ...linkProps
}: SidebarLinkProps) {
  const pathname = usePathname();

  const masterArgument = linkProps.href.toString().split("/")[1];

  const isSelected = pathname.split("/").includes(masterArgument);

  return (
    <Link
      {...linkProps}
      className={cn(
        sidebarLinkVariants({
          variant: isSelected ? "selected" : variant,
          size,
        }),
        className
      )}
    >
      {icon && <i className="text-2xl">{icon}</i>}
      {text}
    </Link>
  );
}
