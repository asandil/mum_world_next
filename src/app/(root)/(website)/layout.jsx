import Footer from "@/components/Application/website/Footer";
import Header from "@/components/Application/website/Header";
import React from "react";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GoogleAdSense from "@/components/GoogleAdSense";
import AdUnit from "@/components/AdUnit";

import { Kumbh_Sans } from "next/font/google";

const kumbh = Kumbh_Sans({
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  subsets: ["latin"],
});

const layout = ({ children }) => {
  return (
    <div>
      <Header />
      <div>
        <GoogleAnalytics />
        <GoogleAdSense />

        {/* Top Ad Unit - Leaderboard */}
        <div className="ad-container">
          {/* <div className="ad-label">Advertisement</div> */}
          <AdUnit slot="5878778835" />
        </div>
      </div>
      <main>
        <div>{children}</div>
      </main>
      <Footer />
      <div>
        <GoogleAnalytics />
        <GoogleAdSense />

        {/* Top Ad Unit - Leaderboard */}
        <div className="ad-container">
          {/* <div className="ad-label">Advertisement</div> */}
          <AdUnit slot="5878778835" />
        </div>
      </div>
    </div>
  );
};

export default layout;
