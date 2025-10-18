import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import ReviewModel from "@/models/Review.model";
import UserModel from "@/models/User.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized or Not Admin .");
    }

    await connectDB();

    const searchParams = request.nextUrl.searchParams;

    // Extractquery parameters
    const start = parseInt(searchParams.get("start") || 0, 10);
    const size = parseInt(searchParams.get("size") || 10, 10);
    const filters = JSON.parse(searchParams.get("filters") || "[]");
    const globalFilter = searchParams.get("globalFilter") || "";
    const sorting = JSON.parse(searchParams.get("sorting") || "[]");
    const deleteType = searchParams.get("deleteType");

    // Build match query
    let matchQuery = {};

    if (deleteType === "SD") {
      matchQuery = { deletedAt: null };
    } else if (deleteType === "PD") {
      matchQuery = { deletedAt: { $ne: null } };
    }

    // Global search
    if (globalFilter) {
      matchQuery["$or"] = [
        { title: { $regex: globalFilter, $options: "i" } },
        { review: { $regex: globalFilter, $options: "i" } },
        { "productData.name": { $regex: globalFilter, $options: "i" } },
        {
          $expr: {
            $regexMatch: {
              input: { $toString: "$rating" },
              regex: globalFilter,
              options: "i",
            },
          },
        },
      ];
    }

    // Column filteration
    filters.forEach((filter) => {
      if (
        filter.id === "rating"
      ) {
        matchQuery[filter.id] = Number(filter.value);
      } else if (filter.id === "product") {
        matchQuery["productData.name"] = {
          $regex: filter.value,
          $options: "i",
        };
      } else {
        matchQuery[filter.id] = { $regex: filter.value, $options: "i" };
      }
    });

    // Sorting
    let sortQuery = {};
    sorting.forEach((sort) => {
      sortQuery[sort.id] = sort.desc ? -1 : 1;
    });

    // Aggregate pipeline

    const aggregatePipeline = [
      {
        $lookup: {
          from: "products",
          localField: "product",
          foreignField: "_id",
          as: "productData",
        },
      },
      {
        $unwind: {
          path: "$productData",
          preserveNullAndEmptyArrays: true,
        },
      },
      { $match: matchQuery },
      { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
      { $skip: start },
      { $limit: size },
      {
        $project: {
          _id: 1,
          product: "$productData.name",
          rating: 1,
          title: 1,
          review: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
        },
      },
    ];

    // Execute query

    const getReview = await ReviewModel.aggregate(aggregatePipeline);

    // console.log("@@@!!!!getReview", getReview);

    // get totalRowCount
    const totalRowCount = await ReviewModel.countDocuments(matchQuery);

    return NextResponse.json({
      success: true,
      data: getReview,
      meta: { totalRowCount: totalRowCount },
    });
  } catch (error) {
    return catchError(error);
  }
}
