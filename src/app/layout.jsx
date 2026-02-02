// src/app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleAdSense from "@/components/GoogleAdSense";
import AdUnit from "@/components/AdUnit";
import { ToastContainer } from "react-toastify";
import GlobalProvider from "@/components/Application/GlobalProvider";

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
        {/* <Header /> */}

        {/* Top Ad Unit - Leaderboard */}
        <div className="ad-container">
          <div className="ad-label">Advertisement</div>
          <AdUnit slot="5878778835" />
        </div>

        <div className="content-wrapper">
          <main>
            <GlobalProvider>
              <ToastContainer />
              {children}
            </GlobalProvider>
          </main>

          {/* <aside className="ad-sidebar">
            <div className="ad-label">Advertisement</div>
            <AdUnit slot="5878778835" />
          </aside> */}
        </div>

        {/* Bottom Ad Unit - Banner */}
        <div className="ad-container">
          <div className="ad-label">Advertisement</div>
          <AdUnit slot="5878778835" />
        </div>

        {/* <Footer /> */}
      </body>
    </html>
  );
}
