/* Style Imports */
import "~/styles/globals.css";

/* Next Imports */
import { type Metadata } from "next";
import { Geist } from "next/font/google";

/* TRPC Imports */
import { TRPCReactProvider } from "~/trpc/react";

/* Metadata */
export const metadata: Metadata = {
  title: "HermesHub",
  description: "HermesHub",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

/* Fonts */
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className={`dark ${geist.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
};

export default RootLayout;
