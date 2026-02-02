// src/app/layout.jsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
        <div className="content-wrapper">
          <main>
            <GlobalProvider>
              <ToastContainer />
              {children}
            </GlobalProvider>
          </main>
        </div>

        {/* <Footer /> */}
      </body>
    </html>
  );
}
