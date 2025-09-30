import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BreadCrumb = ({ breadCrumbData }) => {
  return (
    <Breadcrumb className="mb-5">
      <BreadcrumbList>
        {breadCrumbData.length > 0 &&
          breadCrumbData.map((data, index) => {
            return index !== breadCrumbData.length - 1 ? (
              <div key={index} className="flex items-center" >
                <BreadcrumbItem>
                  <BreadcrumbLink href={data.href}>
                    {data.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="ms-1 mt-1"/>
              </div>
            ) : (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  <BreadcrumbLink href={data.href}>
                    {data.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </div>
            );
          })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumb;
