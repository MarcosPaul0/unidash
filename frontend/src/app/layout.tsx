import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

const poppins = localFont({
  src: [
    {
      path: "./fonts/poppins-regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/poppins-semibold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./fonts/poppins-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-poppins",
  preload: true,
});

const inter = localFont({
  src: [
    {
      path: "./fonts/inter-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/inter-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-inter",
  preload: true,
});

export const metadata: Metadata = {
  title: "Unidash",
  description: "Gerenciador de indicadores de ensino superior",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <TopLoader color="var(--primary)" showSpinner={false} />

        {children}

        <Toaster />
      </body>
    </html>
  );
}
