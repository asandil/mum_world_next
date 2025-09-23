import React, { Suspense } from "react";
import BlogListClient from "@/components/BlogListClient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BlogListClient />
    </Suspense>
  );
}
