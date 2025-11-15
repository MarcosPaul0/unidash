import { cn } from "@unidash/lib/cn";
import * as React from "react";

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-2xl border py-4 md:py-6 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-4 md:px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 relative",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none font-semibold font-title text-xl", className)}
      {...props}
    />
  );
}

function CardSubtitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-subtitle"
      className={cn(
        "leading-none font-semibold font-title text-lg w-full border-b pb-2",
        className
      )}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 md:px-6", className)}
      {...props}
    />
  );
}

function CardInputsRow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-inputs-row"
      className={cn(
        "flex flex-col md:flex-row items-start gap-4 md:gap-8 w-full",
        className
      )}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardSubtitle,
  CardAction,
  CardDescription,
  CardContent,
  CardInputsRow,
};
