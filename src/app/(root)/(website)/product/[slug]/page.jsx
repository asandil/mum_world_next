import axios from "axios";
import React from "react";
import ProductDetails from "./ProductDetails";

export const revalidate = 3600; // Revalidate every hour

const ProductPage = async ({ params, searchParams }) => {
  const { slug } = await params;
  const { color, size } = await searchParams;

  console.log("Product Details slug in UI ", slug);

  let url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/product/details/${slug}`;

  if (color) {
    url = url + `?color=${color}`;
  }

  if (size) {
    url = url + `&size=${size}`;
  }

  const { data: getProduct } = await axios.get(url);

  console.log("Product Details Data in UI ", getProduct);

  if(!getProduct.success){
    return (
      <div className="flex justify-center items-center py-10 h-[300px] " >
        <h1 className="text-4xl font-semibold" >Data not found</h1>
      </div>
    )
  } else {
    return (
      <ProductDetails 
        product={getProduct?.data?.product} 
        variant={getProduct?.data?.variant} 
        colors={getProduct?.data?.colors} 
        sizes={getProduct?.data?.sizes} 
        reviewCount={getProduct?.data?.reviewCount} 
      />
    )
  }

  return <div>ProductPage</div>;
};

export default ProductPage;
