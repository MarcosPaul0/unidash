"use client";

import { cn } from "@unidash/lib/cn";
import * as React from "react";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className={cn(
        "relative w-full overflow-x-auto rounded-2xl bg-table shadow-sm p-2",
        className
      )}
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm")}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead data-slot="table-header" className={cn(className)} {...props} />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-table-head border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-table-active-row data-[state=selected]:bg-muted not-last:border-b transition-colors",
        className
      )}
      {...props}
    />
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        `text-foreground h-10 px-8 text-left align-middle whitespace-nowrap 
        [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] 
        bg-table-head font-bold first:rounded-bl-2xl first:rounded-tl-2xl
        last:rounded-br-2xl last:rounded-tr-2xl py-6 text-base`,
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        `px-8 py-6 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 
        [&>[role=checkbox]]:translate-y-[2px] text-base`,
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
