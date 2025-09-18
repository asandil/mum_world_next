'use client'

import Script from 'next/script'

const GoogleAnalytics = () => {
  return (
    <>
      <Script
        strategy="afterInteractive"
        // src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GAT_MEASUREMENT_ID}`}
        src={`https://www.googletagmanager.com/gtag/js?id=G-1K8ZGPFVK2`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            // gtag('config', '${process.env.NEXT_PUBLIC_GAT_MEASUREMENT_ID}');
            gtag('config', 'G-1K8ZGPFVK2');
          `,
        }}
      />
    </>
  )
}

export default GoogleAnalytics
