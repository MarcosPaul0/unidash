import { ReactNode } from "react";
import { SidebarProvider } from "@unidash/components/Sidebar/sidebar.context";
import { SidebarSession } from "./_components/SidebarSession";
import { HeaderSession } from "./_components/HeaderSession";
import { Session } from "./_components/Session";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="3xl:max-w-[1920px] py-16 md:py-0 3xl:mx-auto relative">
        <SidebarProvider>
          <SidebarSession />

          <main className="w-screen md:w-[calc(100svw-320px)] md:ml-[320px] flex flex-col gap-4 md:gap-8 p-4 md:p-8">
            <HeaderSession />

            {children}
          </main>
        </SidebarProvider>
      </div>

      <Session />
    </>
  );
}
