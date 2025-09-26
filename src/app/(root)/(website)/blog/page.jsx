import React, { Suspense } from "react";
import BlogListClient from "@/components/BlogListClient";

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
