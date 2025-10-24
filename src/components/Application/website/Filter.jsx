"use client";
import useFetch from "@/hooks/useFetch";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Filter = () => {
  const { data: categoryData } = useFetch("/api/category/get-category");
  console.log("categoryData in Shop UI ", categoryData);

  const { data: colorData } = useFetch("/api/product-variant/colors");
  console.log("colorData in Shop UI ", colorData);

  const { data: sizeData } = useFetch("/api/product-variant/sizes");
  console.log("sizeData in Shop UI ", sizeData);

  return (
    <div>
      <h1>Filter</h1>
      <Accordion type="multiple" defaultValue={["1","2","3","4",]} className="mb-2">
        <AccordionItem value="1">
          <AccordionTrigger>Category</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div>
        {categoryData &&
          categoryData.data &&
          categoryData.data.map((category) => (
            <div key={category._id}>
              <input
                type="checkbox"
                id={category._id}
                name={category.name}
                value={category._id}
              />
              <label htmlFor={category._id} className="ms-2">
                {category.name}
              </label>
            </div>
          ))}
      </div>
      <h1>Color</h1>
      <div>
        {colorData &&
          colorData.data &&
          colorData.data.map((color) => (
            <div key={color._id}>
              <input
                type="checkbox"
                id={color._id}
                name={color.id}
                value={color._id}
              />
              <label htmlFor={color._id} className="ms-2">
                {color.id}
              </label>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Filter;
