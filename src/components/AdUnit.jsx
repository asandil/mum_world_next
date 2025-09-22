// src/components/AdUnit.jsx
"use client";

import { useEffect } from "react";

const AdUnit = ({ slot }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.log("Adsense error:", e);
    }
  }, []);

  return (
    <div className="ad-unit">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-7788727976273942"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdUnit;