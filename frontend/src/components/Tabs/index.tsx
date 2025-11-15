"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@unidash/lib/cn";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-8", className)}
      {...props}
    />
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        `text-muted-foreground inline-flex w-fit items-center 
        justify-center`,
        className
      )}
      {...props}
    />
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        `data-[state=active]:bg-active-tab data-[state=active]:text-active-tab-foreground 
        dark:data-[state=active]:text-active-tab-foreground font-bold
        focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:bg-input/30 
        text-tab-foreground dark:text-muted-foreground inline-flex h-[calc(100%-1px)] 
        flex-1 items-center justify-center gap-1.5 rounded-t-xs relative
        px-3 md:px-5 py-3 text-xs md:text-base whitespace-nowrap transition-[color,box-shadow] 
        focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none 
        disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 
        cursor-pointer after:absolute after:-bottom-1 after:h-1 after:bg-active-tab-foreground 
        after:w-full after:scale-x-0 data-[state=active]:after:scale-x-105 after:duration-300
        after:rounded-t-md`,
        className
      )}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
