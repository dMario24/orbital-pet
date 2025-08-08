import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { version } from '../../package.json';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Orbital Pet",
  description: "Your own satellite pet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-gray-300 flex flex-col min-h-screen`}
      >
        <main className="flex-grow">{children}</main>
        <footer className="w-full text-center text-xs text-gray-500 p-4 font-mono">
          v{version}
        </footer>
      </body>
    </html>
  );
}
