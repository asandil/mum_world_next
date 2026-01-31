"use client";
import {
  IconButton,
  Tooltip,
  Modal,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleDensePaddingButton,
  MRT_ToggleFullScreenButton,
  MRT_ToggleGlobalFilterButton,
  useMaterialReactTable,
} from "material-react-table";
import Link from "next/link";
import React, { useState } from "react";
import RecyclingIcon from "@mui/icons-material/Recycling";
import DeleteIcon from "@mui/icons-material/Delete";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useDeleteMutation from "@/hooks/useDeleteMutation";
import { ButtonLoading } from "../ButtonLoading";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { showToast } from "@/lib/showToast";
import { download, generateCsv, mkConfig } from "export-to-csv";

const Datatable = ({
  queryKey,
  fetchUrl,
  columnsConfig,
  initialPageSize = 10,
  exportEndpoint,
  deleteEndpoint,
  deleteType,
  trashView,
  createAction,
}) => {
  // filter, sorting and pagination states.
  const [columnFilters, setColumnFilters] = useState([]);
  const [globalFilter, setGlobalFilter] = useState([]);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  // Row selection state
  const [rowSelection, setRowSelection] = useState({});

  // Export loading state
  const [exportLoading, setExportLoading] = useState(false);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [pendingDeleteData, setPendingDeleteData] = useState({
    ids: [],
    type: "",
  });

  // handle delete method
  const deleteMutation = useDeleteMutation(queryKey, deleteEndpoint);

  const openDeleteModal = (ids, deleteType) => {
    setPendingDeleteData({ ids, type: deleteType });
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setPendingDeleteData({ ids: [], type: "" });
  };

  const handleDelete = () => {
    deleteMutation.mutate({
      ids: pendingDeleteData.ids,
      deleteType: pendingDeleteData.type,
    });
    setRowSelection({});
    closeDeleteModal();
  };

  // export method
  const handleExport = async (selectedRows) => {
    setExportLoading(true);
    try {
      const csvConfig = mkConfig({
        fieldSeparator: ",",
        decimalSeparator: ".",
        useKeysAsHeaders: true,
        filename: "csv-data",
      });

      let csv;

      if (Object.keys(rowSelection).length > 0) {
        // export only selected rows
        const rowData = selectedRows.map((row) => row.original);
        csv = generateCsv(csvConfig)(rowData);
      } else {
        // export all data
        const { data: response } = await axios.get(exportEndpoint);
        if (!response.success) {
          throw new Error(response.message);
        }

        const rowData = response.data;
        csv = generateCsv(csvConfig)(rowData);
      }

      download(csvConfig)(csv);
    } catch (error) {
      console.log(error);
      showToast("error", error.message);
    } finally {
      setExportLoading(false);
    }
  };

  // Data fetching logics
  const {
    data: { data = [], meta } = {},
    isError,
    isRefetching,
    isLoading,
  } = useQuery({
    queryKey: [queryKey, { columnFilters, globalFilter, pagination, sorting }],
    queryFn: async () => {
      const url = new URL(fetchUrl, process.env.NEXT_PUBLIC_BASE_URL);
      url.searchParams.set(
        "start",
        `${pagination.pageIndex * pagination.pageSize}`
      );
      url.searchParams.set("size", `${pagination.pageSize}`);
      url.searchParams.set("filters", JSON.stringify(columnFilters ?? []));
      url.searchParams.set("globalFilter", globalFilter ?? "");
      url.searchParams.set("sorting", JSON.stringify(sorting ?? []));
      url.searchParams.set("deleteType", deleteType);

      const { data: response } = await axios.get(url.href);
      return response;
    },

    placeholderData: keepPreviousData,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  // Modal style
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  // Get modal title and message based on delete type
  const getDeleteModalContent = () => {
    const { type } = pendingDeleteData;
    const selectedCount = pendingDeleteData.ids.length;

    if (type === "PD") {
      return {
        title: "Permanently Delete Data",
        message: `Are you sure you want to permanently delete ${selectedCount} item(s)? This action cannot be undone.`,
      };
    } else if (type === "RSD") {
      return {
        title: "Restore Data",
        message: `Are you sure you want to restore ${selectedCount} item(s) from trash?`,
      };
    } else {
      return {
        title: "Move to Trash",
        message: `Are you sure you want to move ${selectedCount} item(s) into trash?`,
      };
    }
  };

  // init table
  const table = useMaterialReactTable({
    columns: columnsConfig,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    enableColumnOrdering: true,
    enableStickyHeader: true,
    enableStickyFooter: true,
    initialState: { showColumnFilters: true },
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    muiToolbarAlertBannerProps: isError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    rowCount: meta?.totalRowCount ?? 0,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      globalFilter,
      isLoading,
      pagination,
      showAlertBanner: isError,
      showProgressBars: isRefetching,
      sorting,
      rowSelection,
    },

    getRowId: (originalRow) => originalRow._id,

    renderToolbarInternalActions: ({ table }) => (
      <>
        {/* built in button */}
        <MRT_ToggleGlobalFilterButton table={table} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
        <MRT_ToggleDensePaddingButton table={table} />

        {deleteType !== "PD" && (
          <Tooltip title="Recycle Bin">
            <Link href={trashView}>
              <IconButton>
                <RecyclingIcon />
              </IconButton>
            </Link>
          </Tooltip>
        )}

        {deleteType === "SD" && (
          <Tooltip title="Delete All">
            <IconButton
              disabled={
                !table.getIsSomePageRowsSelected() &&
                !table.getIsAllRowsSelected()
              }
              onClick={() =>
                openDeleteModal(Object.keys(rowSelection), deleteType)
              }
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        )}
        {deleteType === "PD" && (
          <>
            <Tooltip title="Restore Data">
              <IconButton
                disabled={
                  !table.getIsSomePageRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                onClick={() =>
                  openDeleteModal(Object.keys(rowSelection), "RSD")
                }
              >
                <RestoreFromTrashIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Permanently Delete">
              <IconButton
                disabled={
                  !table.getIsSomePageRowsSelected() &&
                  !table.getIsAllRowsSelected()
                }
                onClick={() =>
                  openDeleteModal(Object.keys(rowSelection), deleteType)
                }
              >
                <DeleteForeverIcon />
              </IconButton>
            </Tooltip>
          </>
        )}
      </>
    ),

    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ row }) =>
      createAction(row, deleteType, openDeleteModal),

    renderTopToolbarCustomActions: ({ table }) => (
      <Tooltip>
        <ButtonLoading
          type="button"
          text={
            <>
              <SaveAltIcon fontSize="30" /> Export
            </>
          }
          loading={exportLoading}
          onClick={() => handleExport(table.getSelectedRowModel().rows)}
          className="cursor-pointer"
        />
      </Tooltip>
    ),
  });

  const modalContent = getDeleteModalContent();

  return (
    <>
      <MaterialReactTable table={table} />

      {/* Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onClose={closeDeleteModal}
        aria-labelledby="delete-confirmation-modal"
        aria-describedby="delete-confirmation-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="delete-confirmation-modal"
            variant="h6"
            component="h2"
            gutterBottom
          >
            {modalContent.title}
          </Typography>
          <Typography
            id="delete-confirmation-description"
            sx={{ mt: 2, mb: 3 }}
          >
            {modalContent.message}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button onClick={closeDeleteModal} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="contained"
              color={pendingDeleteData.type === "PD" ? "error" : "primary"}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Processing..." : "Confirm"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Datatable;
