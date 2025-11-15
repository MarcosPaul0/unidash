"use client";

import { CourseSelect } from "../CourseSelect";
import { SidebarMenu } from "../SidebarMenu";
import { UserMenu } from "../UserMenu";

export function HeaderSession() {
  return (
    <header
      className={`
        fixed top-0 py-2 md:py-0 md:top-auto left-0 md:left-auto md:w-full
        w-svw md:relative flex flex-row gap-4 items-center justify-between 
        bg-menu-foreground md:bg-transparent px-2 md:px-0 opacity-100 z-10
      `}
    >
      <SidebarMenu />

      <CourseSelect type="authenticated" />

      <UserMenu />
    </header>
  );
}
