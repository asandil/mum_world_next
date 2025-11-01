"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  WEBSITE_CART,
  WEBSITE_PRODUCT_DETAILS,
  WEBSITE_SHOP,
} from "@/routes/WebsiteRoute";
import Link from "next/link";
import Image from "next/image";
import imagePlaceholder from "@/assets/images/img-placeholder.webp";
import { IoStar } from "react-icons/io5";
import { decode, encode } from "entities";
import { FaPlus } from "react-icons/fa6";
import { FiMinus } from "react-icons/fi";
import { Input } from "@/components/ui/input";
import { ButtonLoading } from "@/components/Application/ButtonLoading";
import { useDispatch, useSelector } from "react-redux";
import { addIntoCart } from "@/store/reducer/cartReducer";
import { showToast } from "@/lib/showToast";
import { Button } from "@/components/ui/button";
import loadingSvg from "@/assets/images/loading.svg";
import ProductReview from "@/components/Application/website/Productreview";

const ProductDetails = ({ product, variant, colors, sizes, reviewCount }) => {
  // console.log("product",product)
  // console.log("variant",variant)
  // console.log("colors",colors)
  // console.log("sizes",sizes)
  // console.log("reviewCount",reviewCount)

  const dispatch = useDispatch();
  const cartStore = useSelector((store) => store.cartStore);

  const [activeThumb, setActiveThumb] = useState();
  const [qty, setQty] = useState(1);
  const [isAddedIntoCart, setIsAddedIntoCart] = useState(false);

  const [isProductLoading, setIsProductLoading] = useState(false);

  useEffect(() => {
    setActiveThumb(variant?.media?.[0]?.secure_url);
  }, [variant]);

  useEffect(() => {
    if (cartStore.count > 0) {
      const existingProduct = cartStore.products.findIndex(
        (cartProduct) =>
          cartProduct.productId === product._id &&
          cartProduct.variantId === variant._id
      );
      if (existingProduct >= 0) {
        setIsAddedIntoCart(true);
      } else {
        setIsAddedIntoCart(false);
      }
    }
    setIsProductLoading(false);
  }, [variant]);

  const handleThumb = (thumbUrl) => {
    setActiveThumb(thumbUrl);
  };

  const handleQty = (actionType) => {
    if (actionType === "inc") {
      setQty((prev) => prev + 1);
    } else {
      if (qty !== 1) {
        setQty((prev) => prev - 1);
      }
    }
  };

  const handleAddToCart = () => {
    const cartProduct = {
      productId: product._id,
      variantId: variant._id,
      name: product.name,
      url: product.slug,
      size: variant.size,
      color: variant.color,
      mrp: variant.mrp,
      sellingPrice: variant.sellingPrice,
      image: variant?.media?.[0]?.secure_url,
      qty: qty,
    };
    dispatch(addIntoCart(cartProduct));
    setIsAddedIntoCart(true);
    showToast("success", "Product added into cart successfully.");
    console.log("Add to cart product:", cartProduct);
  };

  return (
    <div className="lg:px-32 px-4">
      <div className="my-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={WEBSITE_SHOP}>Product</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>
                <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug)}>
                  {product?.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className=" relative md:flex justify-between items-start lg:gap-10 gap-5 mb-20">
        <div className="md:w-1/2 xl:flex xl:justify-center xl:gap-5 md:sticky md:top-0">
          <div className="xl:order-last xl:mb-0 mb-5 xl:w-[calc(100%-144px)]">
            <Image
              src={activeThumb || imagePlaceholder.src}
              width={650}
              height={650}
              alt="product"
              className="border rounded max-w-full"
            />
          </div>
          <div className="flex xl:flex-col items-center xl:gap-5 gap-3 xl:w-36 overflow-auto xl:pb-0 pb-2 max-h-[600]">
            {variant?.media?.map((thumb) => (
              <Image
                key={thumb._id}
                src={thumb?.secure_url || imagePlaceholder.src}
                width={100}
                height={100}
                alt="product thumbnail"
                className={`md:max-w-full max-w-16 rounded cursor-pointer ${
                  thumb.secure_url === activeThumb
                    ? "border-2 border-primary "
                    : "border"
                } `}
                onClick={() => handleThumb(thumb?.secure_url)}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:block">
          {isProductLoading && (
            <div className="  absolute z-50 left-1/2 top-[25%] ">
              <Image src={loadingSvg} width={80} height={80} />
            </div>
          )}
        </div>

        <div className="md:w-1/2 md:mt-0 mt-5 relative">
          {/* Name Section */}
          <h1 className="text-3xl font-semibold mb-2">{product.name}</h1>

          {/* Review Section */}
          <div className="flex items-center gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <IoStar key={i} />
            ))}
            <span className="text-sm ps-2">({reviewCount} Reviews )</span>
          </div>

          {/* Selling Price, Mrp and Discount Percentage Section */}
          <div className="flex items-center gap-2 mb-3">
            <span className=" text-xl font-semibold">
              {variant?.sellingPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className=" text-sm line-through text-gray-500">
              {variant?.mrp.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className=" bg-green-500 rounded-2xl px-3 py-1 text-white text-xs ms-5 ">
              {variant?.discountPercentage}% OFF
            </span>
          </div>

          {/* Product Description */}
          <div
            className="line-clamp-3"
            dangerouslySetInnerHTML={{ __html: decode(product.description) }}
          ></div>
          {/* Color Section */}
          <div className="mt-5">
            <p className="mb-2">
              <span
                className="
              font-semibold"
              >
                Color:
              </span>{" "}
              {variant.color}
            </p>
            <div className="flex gap-5">
              {colors.map((color) => (
                <Link
                  href={`${WEBSITE_PRODUCT_DETAILS(
                    product.slug
                  )}?color=${color}&size=${variant.size}`}
                  key={color}
                  onClick={() => setIsProductLoading(true)}
                  className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${
                    color === variant.color ? "bg-primary text-white" : ""
                  }`}
                >
                  {color}
                </Link>
              ))}
            </div>
          </div>

          <div className="block md:hidden">
            {isProductLoading && (
              <div className="  absolute z-50 left-[45%] top-[30%] ">
                <Image src={loadingSvg} width={80} height={80} />
              </div>
            )}
          </div>

          {/* Size Section */}
          <div className="mt-5">
            <p className="mb-2">
              <span
                className="
              font-semibold"
              >
                Size:
              </span>{" "}
              {variant.size}
            </p>
            <div className="flex gap-5">
              {sizes.map((size) => (
                <Link
                  href={`${WEBSITE_PRODUCT_DETAILS(product.slug)}?color=${
                    variant.color
                  }&size=${size}`}
                  key={size}
                  onClick={() => setIsProductLoading(true)}
                  className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white ${
                    size === variant.size ? "bg-primary text-white" : ""
                  }`}
                >
                  {size}
                </Link>
              ))}
            </div>
          </div>

          {/* Quantity Section */}
          <div className="mt-5">
            <p className="font-bold mb-2">Quantity</p>
            <div className="flex items-center h-10 border w-fit rounded-full">
              <button
                type="button"
                onClick={() => handleQty("desc")}
                className="h-full w-10 flex justify-center items-center cursor-pointer "
              >
                <FiMinus />
              </button>
              <Input
                type="text"
                value={qty}
                className="w-14 text-center border-none outline-offset-0"
                readOnly
              />
              <button
                type="button"
                onClick={() => handleQty("inc")}
                className="h-full w-10 flex justify-center items-center cursor-pointer "
              >
                <FaPlus />
              </button>
            </div>
          </div>

          {/* Add To Cart Section */}

          <div className="mt-5">
            {!isAddedIntoCart ? (
              <ButtonLoading
                type="button"
                text="Add To Cart"
                className="w-full rounded-full py-6 text-md cursor-pointer"
                onClick={handleAddToCart}
              />
            ) : (
              <Button
                type="button"
                asChild
                className="w-full rounded-full py-6 text-md cursor-pointer"
              >
                <Link href={WEBSITE_CART}>Go To Cart</Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="mb-20">
        <div className="shadow rounded border">
          <div className="p-3 bg-gray-50 border-b">
            <h2 className="font-semibold text-2xl">Product Description</h2>
          </div>
          <div className="p-3">
            <div
              dangerouslySetInnerHTML={{ __html: encode(product.description) }}
            ></div>
          </div>
        </div>
      </div>

      <ProductReview product={product} />

    </div>
  );
};

export default ProductDetails;
