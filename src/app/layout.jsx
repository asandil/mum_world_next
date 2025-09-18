import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleAdSense from "@/components/GoogleAdSense";
import AdUnit from "@/components/AdUnit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pregnancy Journey And New Born Care | mumworld.in",
  description:
    "Your go-to place for every tip, guide, and support a mum needs—helping you navigate motherhood with confidence and care.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GoogleAnalytics />
        <GoogleAdSense />
        <Header />
        <div className="border border-red-500 mx-[400px] " >
          <AdUnit slot="5878778835" />
        </div>
        {children}
       <div className="border border-red-500 mx-[400px] " >
          <AdUnit slot="5878778835" />
        </div>
        <Footer />
      </body>
    </html>
  );
}
