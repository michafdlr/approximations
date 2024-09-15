import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopNav from "./ui/topnav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quadratwurzeln",
  description: "Lerne wie man die Werte von Quadratwurzeln mit Hilfe des Intervallhalbierungsverfahrens und des Heronverfahrens approximieren kann.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body className={`${inter.className} antialiased`}>
        <TopNav />
        <div className="relative p-2">{children}</div>
      </body>
    </html>
  );
}
