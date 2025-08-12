import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { GoogleTagManager } from '@next/third-parties/google'
import { SpeedInsights } from "@vercel/speed-insights/next"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteConfig = {
  title: "Orbital Pet: 당신만의 인공위성 애완동물",
  description: "당신만의 인공위성 애완동물을 키워보세요. Orbital Pet의 최신 소식을 받아보세요!",
  url: "https://orbital-pet.diginori.com", // TODO: 프로덕션 URL로 변경해주세요.
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | Orbital Pet`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: "Orbital Pet",
    images: [
      {
        url: "/og250811.png",
        width: 1200,
        height: 630,
        alt: "Orbital Pet",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og250811.png"],
  },
  alternates: {
    canonical: siteConfig.url,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="starfield"></div>
        <GoogleTagManager gtmId="GTM-WNZ8TPZV" />
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
