import { LogoMaster } from "@unidash/assets/svgs/LogoMaster";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-quaternary flex justify-center bg-accent">
      <main
        className={`
          3xl:max-w-[1920px] w-full min-h-svh flex 
          items-center p-8
        `}
      >
        <LogoMaster className="hidden md:block md:ml-auto my-0" />

        <div
          className={`
            bg-accent-foreground p-12 md:p-24 flex flex-col rounded-3xl
            max-h-[800px] max-w-[720px] w-full my-0 ml-auto gap-8 md:gap-20
          `}
        >
          {children}
        </div>
      </main>
    </div>
  );
}
