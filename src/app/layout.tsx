import type { Metadata } from "next";
import './globals.css'
import Sidebar from "@/components/navegations/Sidebar";
import Header from "@/components/navegations/Header";
import Web3Provider from "@/context/Web3Provider";

export const metadata: Metadata = {
  title: "Explorer",
  description: "RSK Explorer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Web3Provider>
        <body className="flex">
          <Sidebar />
          <div className="w-full px-5">
            <Header />
            {children}
          </div>
        </body>
      </Web3Provider>
    </html>
  );
}