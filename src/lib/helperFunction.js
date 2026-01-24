import { NextResponse } from "next/server";

export const response = (success, statusCode, message, data = {}) => {
  return NextResponse.json({
    success,
    statusCode,
    message,
    data,
  });
};

// export const catchError = (error, customMessage) => {
//   // handling duplicate key error
//   if (error.code === 11000) {
//     const keys = Object.keys(error.keyPattern).join(",");
//     error.message = `Duplicate field: ${keys}. These fields value must be unique`;
//   }

//   let errorObj = {};

//   if (process.env.NODE_ENV === "development") {
//     errorObj = {
//       message: error.message,
//       error,
//     };
//   } else {
//     errorObj = {
//       message: customMessage || "Internal server error",
//     };
//   }
//   return NextResponse.json({
//     success: false,
//     statusCode: error.code,
//     ...errorObj,
//   });
// };

export const catchError = (error, customMessage) => {
  // Handle duplicate key error
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern || {}).join(", ");
    return NextResponse.json({
      success: false,
      statusCode: 400, // Use proper HTTP status code
      message: `Duplicate field: ${keys}. These field values must be unique`,
    });
  }

  // Handle validation errors
  if (error.name === "ValidationError") {
    return NextResponse.json({
      success: false,
      statusCode: 400,
      message: "Validation failed",
      errors: error.errors
        ? Object.values(error.errors).map((err) => err.message)
        : [],
    });
  }

  // Handle Zod errors
  if (error.name === "ZodError") {
    return NextResponse.json({
      success: false,
      statusCode: 400,
      message: "Validation failed",
      errors: error.errors || [],
    });
  }

  // Default error handling
  let errorObj = {};

  if (process.env.NODE_ENV === "development") {
    errorObj = {
      message: error.message,
      error: error.stack || error,
    };
  } else {
    errorObj = {
      message: customMessage || "Internal server error",
    };
  }

  return NextResponse.json({
    success: false,
    statusCode: 500, // Always use proper HTTP status codes
    ...errorObj,
  });
};

export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

export const columnConfig = (
  column,
  isCreatedAt = false,
  isUpdatedAt = false,
  isDeletedAt = false
) => {
  const newCloumn = [...column];

  if (isCreatedAt) {
    newCloumn.push({
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ renderedCellValue }) =>
        new Date(renderedCellValue).toLocaleString(),
    });
  }
  if (isUpdatedAt) {
    newCloumn.push({
      accessorKey: "updatedAt",
      header: "Updated At",
      cell: ({ renderedCellValue }) =>
        new Date(renderedCellValue).toLocaleString(),
    });
  }
  if (isDeletedAt) {
    newCloumn.push({
      accessorKey: "deletedAt",
      header: "Deleted At",
      cell: ({ renderedCellValue }) =>
        new Date(renderedCellValue).toLocaleString(),
    });
  }
  return newCloumn;
};


export const statusBadge = (status) => {
  const statusColorConfig = {
    pending: 'bg-blue-500',
    processing: 'bg-yellow-500',
    shipped: 'bg-cyan-500',
    delivered: 'bg-green-500',
    cancelled: 'bg-red-500',
    unverified: 'bg-orange-500',
  }
  return <span className={`${statusColorConfig[status]} text-white capitalize px-2 py-1 rounded-full text-xs`}>
    {status}
  </span>
 }