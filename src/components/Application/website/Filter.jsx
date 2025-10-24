"use client";
import useFetch from "@/hooks/useFetch";
import React, { useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { ButtonLoading } from "../ButtonLoading";
import { useRouter, useSearchParams } from "next/navigation";
import { WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Filter = () => {
  const searchParams = useSearchParams();

  console.log("searchParams", searchParams);

  const [priceFilter, setPriceFilter] = React.useState({
    minPrice: 0,
    maxPrice: 3000,
  });

  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [selectedColor, setSelectedColor] = React.useState([]);
  const [selectedSize, setSelectedSize] = React.useState([]);

  const { data: categoryData } = useFetch("/api/category/get-category");
  console.log("categoryData in Shop UI ", categoryData);

  const { data: colorData } = useFetch("/api/product-variant/colors");
  console.log("colorData in Shop UI ", colorData);

  const { data: sizeData } = useFetch("/api/product-variant/sizes");
  console.log("sizeData in Shop UI ", sizeData);

  const urlSearchParams = new URLSearchParams(searchParams.toString());
  const router = useRouter();

  useEffect(() => {
    searchParams.get("category")
      ? setSelectedCategory(searchParams.get("category").split(","))
      : setSelectedCategory([]);
    searchParams.get("color")
      ? setSelectedColor(searchParams.get("color").split(","))
      : setSelectedColor([]);
    searchParams.get("size")
      ? setSelectedSize(searchParams.get("size").split(","))
      : setSelectedSize([]);
  }, [searchParams]);

  const handlePriceChange = (value) => {
    console.log("Selected price range: ", value);
    setPriceFilter({ minPrice: value[0], maxPrice: value[1] });
  };

  const handleCategoryFilter = (categorySlug) => {
    let newSelectedCategory = [...selectedCategory];
    if (newSelectedCategory.includes(categorySlug)) {
      newSelectedCategory = newSelectedCategory.filter(
        (cat) => cat !== categorySlug
      );
    } else {
      newSelectedCategory.push(categorySlug);
    }
    setSelectedCategory(newSelectedCategory);

    newSelectedCategory.length > 0
      ? urlSearchParams.set("category", newSelectedCategory.join(","))
      : urlSearchParams.delete("category");
    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`);
  };

  const handleColorFilter = (color) => {
    let newSelectedColor = [...selectedColor];
    if (newSelectedColor.includes(color)) {
      newSelectedColor = newSelectedColor.filter((col) => col !== color);
    } else {
      newSelectedColor.push(color);
    }
    setSelectedColor(newSelectedColor);

    newSelectedColor.length > 0
      ? urlSearchParams.set("color", newSelectedColor.join(","))
      : urlSearchParams.delete("color");
    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`);
  };

  const handleSizeFilter = (size) => {
    let newSelectedSize = [...selectedSize];
    if (newSelectedSize.includes(size)) {
      newSelectedSize = newSelectedSize.filter((size) => size !== size);
    } else {
      newSelectedSize.push(size);
    }
    setSelectedSize(newSelectedSize);

    newSelectedSize.length > 0
      ? urlSearchParams.set("size", newSelectedSize.join(","))
      : urlSearchParams.delete("size");
    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`);
  };

  const handlePriceFilter = () => {
    urlSearchParams.set("minPrice", priceFilter.minPrice);
    urlSearchParams.set("maxPrice", priceFilter.maxPrice);
    router.push(`${WEBSITE_SHOP}?${urlSearchParams}`);
  }

  return (
    <div>
      {searchParams.size > 0 && <Button variant="destructive" className="w-full" type="button" asChild>
        <Link href={WEBSITE_SHOP} >Clear Filter </Link></Button>}
      <Accordion
        type="multiple"
        defaultValue={["1", "2", "3", "4"]}
        className="mb-2"
      >
        <AccordionItem value="1">
          <AccordionTrigger className="uppercase font-semibold hover:no-underline cursor-pointer ">
            Category
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-h-48 overflow-auto">
              <ul>
                {categoryData &&
                  categoryData.success &&
                  categoryData.data.map((category) => (
                    <li key={category._id}>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <Checkbox
                          onCheckedChange={() =>
                            handleCategoryFilter(category.slug)
                          }
                          checked={selectedCategory.includes(category.slug)}
                        />
                        <span className="ms-2">{category.name}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="2">
          <AccordionTrigger className="uppercase font-semibold hover:no-underline cursor-pointer">
            Color
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-h-48 overflow-auto">
              <ul>
                {colorData &&
                  colorData.success &&
                  colorData.data.map((color) => (
                    <li key={color}>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <Checkbox
                          onCheckedChange={() => handleColorFilter(color)}
                          checked={selectedColor.includes(color)}
                        />
                        <span className="ms-2">{color}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger className="uppercase font-semibold hover:no-underline cursor-pointer">
            Size
          </AccordionTrigger>
          <AccordionContent>
            <div className="max-h-48 overflow-auto">
              <ul>
                {sizeData &&
                  sizeData.success &&
                  sizeData.data.map((size) => (
                    <li key={size}>
                      <label className="flex items-center space-x-3 cursor-pointer">
                        <Checkbox
                          onCheckedChange={() => handleSizeFilter(size)}
                          checked={selectedSize.includes(size)}
                        />
                        <span className="ms-2">{size}</span>
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="3">
          <AccordionTrigger className="uppercase font-semibold hover:no-underline cursor-pointer">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <Slider
              defaultValue={[0, 3000]}
              max={3000}
              step={1}
              onValueChange={handlePriceChange}
            />
            <div className="flex justify-between items-center pt-2 ">
              <span>
                {priceFilter.minPrice.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
              <span>
                {priceFilter.maxPrice.toLocaleString("en-IN", {
                  style: "currency",
                  currency: "INR",
                })}
              </span>
            </div>
            <div className="mt-4">
              <ButtonLoading
                type="button"
                text="Filter Product"
                className="rounded-full cursor-pointer "
                onClick={handlePriceFilter}
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filter;
