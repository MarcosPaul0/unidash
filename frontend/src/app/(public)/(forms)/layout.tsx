import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <main
      className={`
        3xl:max-w-[1920px] p-4 md:p-8 3xl:mx-auto relative 
        flex flex-col gap-8 
      `}
    >
      {children}
    </main>
  );
}
