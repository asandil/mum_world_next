import { Avatar, AvatarImage } from "@/components/ui/avatar";
import userIcon from "@/assets/images/user.png";
import { Chip } from "@mui/material";

export const DT_CATEGORY_COLUMN = [
  {
    accessorKey: "name",
    header: "Category Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
];

export const DT_PRODUCT_COLUMN = [
  {
    accessorKey: "name",
    header: "Product Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "mrp",
    header: "MRP",
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage",
  },
];

export const DT_PRODUCT_VARIANT_COLUMN = [
  {
    accessorKey: "product",
    header: "Product Name",
  },
  {
    accessorKey: "color",
    header: "Color",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "mrp",
    header: "MRP",
  },
  {
    accessorKey: "sellingPrice",
    header: "Selling Price",
  },
  {
    accessorKey: "discountPercentage",
    header: "Discount Percentage",
  },
];

export const DT_CUSTOMERS_COLUMN = [
  {
    accessorKey: "avatar",
    header: "Avatar",
    Cell: ({ renderedCellValue }) => (
      <Avatar>
        <AvatarImage src={renderedCellValue?.url || userIcon.src} />
      </Avatar>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "isEmailVerified",
    header: "Is Verified",
    Cell: ({ renderedCellValue }) =>
      renderedCellValue ? (
        <Chip color="success" label="Verified" />
      ) : (
        <Chip color="error" label="Not Verified" />
      ),
  },
];
