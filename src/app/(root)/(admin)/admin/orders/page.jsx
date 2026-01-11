import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import DatatableWrapper from "@/components/Application/Admin/DatatableWrapper";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import Link from "next/link";
import React from "react";

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: "", label: "Orders" },
];

const ShowOrders = () => {
  return (
    <div>
      <BreadCrumb breadCrumbData={breadCrumbData} />
      <Card className="py-0 rounded shadow-sm gap-0">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Show Orders</h4>
            <Button>
              <FiPlus />
              <Link></Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-5 px-0">
          <DatatableWrapper
            queryKey=""
            fetchUrl=""
            initialPageSize=""
            columnsConfig=""
            exportEndpoint=""
            deleteEndPoint=""
            deleteType=""
            trashView=""
            createAction=""
          ></DatatableWrapper>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowOrders;
