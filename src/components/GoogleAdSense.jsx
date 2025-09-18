"use client";

import Script from "next/script";

const GoogleAdSense = () => {
  return (
    <Script
      async
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7788727976273942"
      crossOrigin="anonymous"
    />
  );
};

export default GoogleAdSense;
