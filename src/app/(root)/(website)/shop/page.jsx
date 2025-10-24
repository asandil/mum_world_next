"use client"
import Filter from "@/components/Application/website/Filter";
import Sorting from "@/components/Application/website/Sorting";
import WebsiteBreadcrumb from "@/components/Application/website/WebsiteBreadcrumb";
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import React, { useState } from "react";

const breadcrumb = {
  title: "Shop",
  links: [{ label: "Shop", href: WEBSITE_SHOP }],
};

const Shop = () => {

  const [limit, setLimit] = useState(12);
  const [sorting, setSorting] = useState("default_sorting");

  return (
    <div >
      <WebsiteBreadcrumb props={breadcrumb} />
      <section className="lg:flex lg:px-32 px-4 my-20">
        <div className="w-72 me-4 ">
          <div className="sticky top-0 bg-gray-50 p-4 rounded">
            <Filter />
          </div>
        </div>
        <div className="lg:w-[calc(100%-18rem)]" >
            <Sorting limit={limit} setLimit={setLimit} sorting={sorting} setSorting={setSorting} />
        </div>
      </section>
    </div>
  );
};

export default Shop;
