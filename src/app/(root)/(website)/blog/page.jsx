import React, { Suspense } from "react";
import BlogListClient from "@/components/BlogListClient";

export const metadata = {
  title: "Motherhood & Wellness Blog | Pregnancy & Baby Care Insights | MumWorld",
  description: "Discover inspiring articles on pregnancy, parenting, baby nutrition, and wellness. Stay informed and supported throughout your motherhood journey on the MumWorld blog.",
  keywords: "pregnancy blog, parenting articles, motherhood blog, baby care tips",
}

export default function Page() {
  return (
    <div >
      <Suspense
        fallback={
          <div className="text-center text-lg font-medium">Loading...</div>
        }
      >
        <BlogListClient />
      </Suspense>
    </div>
  );
}
