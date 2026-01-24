"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import DatatableWrapper from "@/components/Application/Admin/DatatableWrapper";
import DeleteAction from "@/components/Application/Admin/DeleteAction";
import EditAction from "@/components/Application/Admin/EditAction";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DT_BANNER_COLUMN } from "@/lib/column";
import { columnConfig } from "@/lib/helperFunction";
import {
  ADMIN_BANNER_ADD,
  ADMIN_BANNER_EDIT,
  ADMIN_BANNER_SHOW,
  ADMIN_DASHBOARD,
  ADMIN_TRASH,
} from "@/routes/AdminPanelRoute";
import Link from "next/link";
import { useCallback, useMemo } from "react";
import { FiPlus } from "react-icons/fi";

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: ADMIN_BANNER_SHOW, label: "Banner" },
];

const ShowBanner = () => {
  const columns = useMemo(() => {
    return columnConfig(DT_BANNER_COLUMN);
  }, []);

  const action = useCallback((row, deleteType, handleDelete) => {
    let actionMenu = [];
    actionMenu.push(
      <EditAction key="edit" href={ADMIN_BANNER_EDIT(row.original._id)} />,
    );
    actionMenu.push(
      <DeleteAction
        key="delete"
        handleDelete={handleDelete}
        row={row}
        deleteType={deleteType}
      />,
    );
    return actionMenu;
  }, []);

  return (
    <div>
      <BreadCrumb breadCrumbData={breadCrumbData} />
      <Card className="py-0 rounded shadow-sm gap-0">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <div className="flex justify-between items-center">
            <h4 className="text-xl font-semibold">Show Banner</h4>
            <Button>
              <Link href={ADMIN_BANNER_ADD} className="flex gap-1 items-center">
                <FiPlus />
                <span>New Banner</span>
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-5 px-0">
          <DatatableWrapper
            queryKey="banner-data"
            fetchUrl="/api/banner"
            initialPageSize={10}
            columnsConfig={columns}
            exportEndpoint="/api/banner/export"
            deleteEndpoint="/api/banner/delete"
            deleteType="SD"
            trashView={`${ADMIN_TRASH}?trashof=banner`}
            createAction={action}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default ShowBanner;
