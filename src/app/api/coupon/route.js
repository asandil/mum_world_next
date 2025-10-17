import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/db";
import { catchError, response } from "@/lib/helperFunction";
import CouponModel from "@/models/Coupon.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const auth = await isAuthenticated("admin");
    if (!auth.isAuth) {
      return response(false, 403, "Unauthorized or Not Admin .");
    }

    await connectDB()

    const searchParams = request.nextUrl.searchParams

    // Extractquery parameters
    const start = parseInt(searchParams.get('start') || 0, 10)
    const size = parseInt(searchParams.get('size') || 10, 10)
    const filters = JSON.parse(searchParams.get('filters') || "[]")
    const globalFilter = searchParams.get('globalFilter') || ""
    const sorting = JSON.parse(searchParams.get('sorting') || "[]")
    const deleteType = searchParams.get('deleteType')

    // Build match query
    let matchQuery = {}

    if(deleteType === "SD"){
      matchQuery = { deletedAt: null }
    }else if (deleteType === "PD"){
      matchQuery = { deletedAt: { $ne: null } }
    }

    // Global search
    if(globalFilter){
      matchQuery["$or"] = [
        {code: {$regex: globalFilter, $options: 'i'}},
        {discountPercentage: {$regex: globalFilter, $options: 'i'}},
        {minShoppingAmount: {$regex: globalFilter, $options: 'i'}},
        {validity: {$regex: globalFilter, $options: 'i'}},
      ] 
    }

    // Column filteration
    filters.forEach(filter => {
      matchQuery[filter.id] = { $regex: filter.value, $options: "i" }
    });

    // Sorting
    let sortQuery = {}
    sorting.forEach(sort => {
      sortQuery[sort.id] = sort.desc ? -1 : 1
    })

    // Aggregate pipeline

    const aggregatePipeline = [
      { $match: matchQuery },
      { $sort: Object.keys(sortQuery).length ? sortQuery : { createdAt: -1 } },
      { $skip: start },
      { $limit: size },
      {
        $project:{
          _id: 1,
          code: 1,
          discountPercentage: 1,
          minShoppingAmount: 1,
          validity: 1,
          createdAt : 1,
          updatedAt: 1,
          deletedAt: 1
        }
      }
    ]

    // Execute query

    const getCoupon = await CouponModel.aggregate(aggregatePipeline)

    // get totalRowCount
    const totalRowCount = await CouponModel.countDocuments(matchQuery)

    return NextResponse.json({
      success: true,
      data: getCoupon,
      meta: { totalRowCount: totalRowCount}
    })

  } catch (error) {
    return catchError(error);
  }
}
