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
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      // data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT}
      data-ad-client="ca-pub-7788727976273942"
      // data-ad-slot={slot}
      data-ad-slot="5878778835"
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
};

export default AdUnit;
