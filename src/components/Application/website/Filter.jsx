"use client";
import useFetch from "@/hooks/useFetch";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider"

const Filter = () => {

  const [priceFilter, setPriceFilter] = React.useState({minPrice: 0, maxPrice:0});

  const { data: categoryData } = useFetch("/api/category/get-category");
  console.log("categoryData in Shop UI ", categoryData);

  const { data: colorData } = useFetch("/api/product-variant/colors");
  console.log("colorData in Shop UI ", colorData);

  const { data: sizeData } = useFetch("/api/product-variant/sizes");
  console.log("sizeData in Shop UI ", sizeData);

  const handlePriceChange = (value) => {
    console.log("Selected price range: ", value);
    setPriceFilter({minPrice: value[0], maxPrice: value[1]});
  }


  return (
    <div>
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
                        <Checkbox />
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
                        <Checkbox />
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
                        <Checkbox />
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
            <Slider defaultValue={[0, 3000]} max={3000} step={1} onValueChange={handlePriceChange} />
            <div className="flex justify-between items-center pt-2 " > 
                  <span>{priceFilter.minPrice.toLocaleString('en-IN', { style: 'currency', currency:'INR' })}</span>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Filter;
