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
import { IoCloseCircleSharp, IoStar } from "react-icons/io5";
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
import ProductReview from "@/components/Application/website/ProductReview";
import { FaShippingFast } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";

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

  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  useEffect(() => {
    setActiveThumb(variant?.media?.[0]?.secure_url);
  }, [variant]);

  useEffect(() => {
    if (cartStore.count > 0) {
      const existingProduct = cartStore.products.findIndex(
        (cartProduct) =>
          cartProduct.productId === product._id &&
          cartProduct.variantId === variant._id,
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

  const parseProductDescription = (description) => {
    const decoded = decodeHTML(description);
    const lines = decoded.split("\n");
    const result = [];
    let i = 0;

    while (i < lines.length) {
      let line = lines[i].trim();

      // Handle bullet points with potential bold text inside
      if (line.startsWith("•")) {
        const bulletPoints = [];
        while (i < lines.length && lines[i].trim().startsWith("•")) {
          let bulletText = lines[i].trim().substring(1).trim();

          // Check if bullet text contains bold markers
          if (bulletText.includes("**")) {
            // Extract bold parts and regular text
            const parts = [];
            let currentPart = "";
            let isBold = false;
            let j = 0;

            while (j < bulletText.length) {
              if (bulletText.substr(j, 2) === "**") {
                // Push current part
                if (currentPart) {
                  parts.push({
                    text: currentPart,
                    isBold: isBold,
                  });
                  currentPart = "";
                }
                isBold = !isBold;
                j += 2;
              } else {
                currentPart += bulletText[j];
                j++;
              }
            }

            // Push last part
            if (currentPart) {
              parts.push({
                text: currentPart,
                isBold: isBold,
              });
            }

            // Render bullet point with bold text
            bulletPoints.push(
              <div key={i} className="flex items-start ml-4 my-1">
                <span className="mr-2">•</span>
                <span>
                  {parts.map((part, idx) =>
                    part.isBold ? (
                      <strong key={idx}>{part.text}</strong>
                    ) : (
                      part.text
                    ),
                  )}
                </span>
              </div>,
            );
          } else {
            // Regular bullet point without bold
            bulletPoints.push(
              <div key={i} className="flex items-start ml-4 my-1">
                <span className="mr-2">•</span>
                <span>{bulletText}</span>
              </div>,
            );
          }
          i++;
        }
        result.push(...bulletPoints);
        continue;
      }

      // Handle standalone bold text (for lines without bullet points)
      // This pattern matches lines that start and end with **
      if (line.startsWith("**") && line.endsWith("**")) {
        const boldText = line.substring(2, line.length - 2);
        result.push(
          <div key={i} className="my-2">
            <strong>{boldText}</strong>
          </div>,
        );
        i++;
        continue;
      }

      // Handle bold text at the beginning of a line
      if (line.startsWith("**")) {
        // Look for the closing **
        const endBoldIndex = line.indexOf("**", 2);
        if (endBoldIndex !== -1) {
          const boldText = line.substring(2, endBoldIndex);
          const remainingText = line.substring(endBoldIndex + 2).trim();

          result.push(
            <div key={i} className="my-2">
              <strong>{boldText}</strong>
              {remainingText && <span> {remainingText}</span>}
            </div>,
          );
        } else {
          // No closing ** found, treat entire line as bold
          result.push(
            <div key={i} className="my-2">
              <strong>{line.substring(2)}</strong>
            </div>,
          );
        }
        i++;
        continue;
      }

      // Skip separator lines and empty lines
      const cleanLine = line.replace(/\||\s+/g, "");
      if (
        cleanLine.includes("---") ||
        cleanLine.includes("___") ||
        line === "" ||
        line === "|" ||
        line === "| |"
      ) {
        i++;
        continue;
      }

      // Regular text - check if it contains bold markers
      if (line.includes("**")) {
        const parts = [];
        let currentPart = "";
        let isBold = false;
        let j = 0;

        while (j < line.length) {
          if (line.substr(j, 2) === "**") {
            // Push current part
            if (currentPart) {
              parts.push({
                text: currentPart,
                isBold: isBold,
              });
              currentPart = "";
            }
            isBold = !isBold;
            j += 2;
          } else {
            currentPart += line[j];
            j++;
          }
        }

        // Push last part
        if (currentPart) {
          parts.push({
            text: currentPart,
            isBold: isBold,
          });
        }

        result.push(
          <div key={i} className="my-1">
            {parts.map((part, idx) =>
              part.isBold ? <strong key={idx}>{part.text}</strong> : part.text,
            )}
          </div>,
        );
      } else {
        // Plain text without any formatting
        result.push(
          <div key={i} className="my-1">
            {line}
          </div>,
        );
      }

      i++;
    }

    return result;
  };

  // Don't forget the decodeHTML function
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
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
          <div className="line-clamp-4">
            <div>{parseProductDescription(product.description)}</div>
          </div>
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
                    product.slug,
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
            <button
              type="button"
              onClick={() => setIsSizeChartOpen(true)}
              className="mt-4 text-primary font-medium hover:text-primary-hover flex items-center gap-1 cursor-pointer group"
            >
              <span className="border-b border-dashed border-primary group-hover:border-solid">
                Size Guide
              </span>
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
            {/* <p>Shop with confidence</p> */}
            <div className=" mt-4 md:mt-8 p-6 bg-primary/20 rounded-lg">
              <div className="flex items-center gap-3 mb-2">
                <FaShippingFast className="text-primary" size={24} />
                <h3 className="font-bold text-lg">
                  Free Shipping & Easy Returns
                </h3>
              </div>
              <p className="text-gray-600">
                Enjoy free shipping on all orders above ₹599 and 10-day easy
                returns on all products.
              </p>
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

      <div className="mb-10">
        <div className="shadow rounded border">
          <div className="p-3 bg-gray-50 border-b">
            <h2 className="font-semibold text-2xl">Product details</h2>
          </div>

          <div className="p-3">
            <div className="font-sans">
              {parseProductDescription(product.description)}
            </div>
          </div>
        </div>
      </div>

      <ProductReview productId={product._id} />

      {/* Size Chart Modal */}
      {isSizeChartOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setIsSizeChartOpen(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[70vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b relative">
              <div className="flex ml-[-8px]">
                <Image
                  src="https://res.cloudinary.com/dc0wr8hev/image/upload/v1768831068/wgbmmecdy7p8dwy6txjo.png"
                  height={40}
                  width={40}
                  alt=""
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Size Guide
                  </h3>
                  <p className="text-sm text-gray-500">Find your perfect fit</p>
                </div>
              </div>

              <button
                onClick={() => setIsSizeChartOpen(false)}
                className="w-8 h-8 absolute right-3 top-3 cursor-pointer rounded-full flex items-center justify-center transition-colors"
              >
                <IoMdCloseCircleOutline size={32} color="#F69E87" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="mb-6">
                <h4 className="font-semibold text-lg mb-3">How to Measure:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <strong>Bust:</strong> Measure around the fullest part of
                      your bust
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <strong>Waist:</strong> Measure around your natural
                      waistline
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>
                      <strong>Hips:</strong> Measure around the fullest part of
                      your hips
                    </span>
                  </li>
                </ul>
              </div>

              {/* Size Table */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-900">
                    Size Chart (in inches)
                  </h4>
                  <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">
                    Standard Fit
                  </span>
                </div>

                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700 border-r">
                          Size
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700 border-r">
                          Bust
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700 border-r">
                          Waist
                        </th>
                        <th className="text-center py-3 px-4 font-semibold text-gray-700">
                          Hips
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {[
                        {
                          size: "XS",
                          bust: "32-34",
                          waist: "24-26",
                          hips: "34-36",
                        },
                        {
                          size: "S",
                          bust: "34-36",
                          waist: "26-28",
                          hips: "36-38",
                        },
                        {
                          size: "M",
                          bust: "36-38",
                          waist: "28-30",
                          hips: "38-40",
                        },
                        {
                          size: "L",
                          bust: "38-40",
                          waist: "30-32",
                          hips: "40-42",
                        },
                        {
                          size: "XL",
                          bust: "40-42",
                          waist: "32-34",
                          hips: "42-44",
                        },
                        {
                          size: "XXL",
                          bust: "42-44",
                          waist: "34-36",
                          hips: "44-46",
                        },
                      ].map((row, index) => (
                        <tr
                          key={row.size}
                          className={`hover:bg-gray-50 ${variant.size === row.size ? "bg-primary/20" : ""}`}
                        >
                          <td className="py-3 px-4 font-medium border-r">
                            <div className="flex items-center gap-2">
                              {row.size}
                              {variant.size === row.size && (
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 text-center border-r">
                            {row.bust}
                          </td>
                          <td className="py-3 px-4 text-center border-r">
                            {row.waist}
                          </td>
                          <td className="py-3 px-4 text-center">{row.hips}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Current Size Indicator */}
                <div className="mt-4 p-3 bg-primary/10 rounded-lg border border-primary">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <p className="text-[16px] text-gray-700">
                      Your selected size:{" "}
                      <span className="font-bold text-primary">
                        {variant.size}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Help Note */}
                <div className="mt-4 p-3 bg-primary rounded-lg border border-amber-100">
                  <p className="text-sm text-white">
                    <span className="font-medium">Note:</span> Measurements are
                    approximate. For custom sizing or assistance,
                    <Link
                      href="/contact-us"
                      className="ml-1 text-white font-medium underline"
                    >
                      contact support
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t">
              <ButtonLoading
                type="button"
                text="Close"
                className="w-full rounded-full py-6 text-md cursor-pointer"
                onClick={() => setIsSizeChartOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
