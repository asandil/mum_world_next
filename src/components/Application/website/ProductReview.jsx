import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";

import imagePlaceholder from "@/assets/images/img-placeholder.webp";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { IoStar } from "react-icons/io5";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

const ProductReview = ({ product }) => {
  return (
    <Card>
      <CardHeader className="flex justify-between ">
        <h4 className="font-semibold text-2xl">Rating and Reviews</h4>
        <Button className="cursor-pointer">Write Review</Button>
      </CardHeader>
      <CardContent>
        <div className=" shadow-xl rounded-xl w-full flex flex-col gap-[30px] sm:flex-row p-4 flex-wrap ">
          <div className="shadow-xl   rounded-xl px-4 py-2 gap-[12px] ">
            <h2 className="text-xl font-semibold ">Total Reviews</h2>
            <div className="flex gap-[6px] items-center">
              <p className="text-3xl font-semibold">10.0k</p>
              <p className="bg-green-500 flex items-center gap-[4px]  rounded-lg text-white px-2 py-1">
                21% <FaArrowTrendUp />
              </p>
            </div>
            <p>Growth in reviews on this year</p>
          </div>
          <div className="shadow-xl  rounded-xl px-4 py-2 gap-[12px] ">
            <h2 className="text-xl font-semibold">Average Rating</h2>
            <div className="flex gap-[6px]">
              <p className="text-2xl font-semibold">4.0</p>
              {Array.from({ length: 1 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <div className="flex items-center">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <span key={i}>
                          <IoStar className="text-yellow-500" />
                        </span>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </div>
            <p>Average rating on this year</p>
          </div>
          <div className="shadow-xl  rounded-xl px-4 py-2 gap-[12px]">
            <div className="flex gap-[4px] items-center">
              <IoStar className="text-gray-300" />
              <span>5</span>
              <p className="w-[250px] h-[6px] bg-green-500 rounded-md"> </p>
              <span> 2.0k</span>
            </div>
            <div className="flex gap-[4px] items-center ">
              <IoStar className="text-gray-300" />
              <span>4</span>
              <p className="w-[150px] h-[6px] bg-blue-500 rounded-md"> </p>
              <span> 1.0k</span>
            </div>
            <div className="flex gap-[4px] items-center">
              <IoStar className="text-gray-300" />
              <span>3</span>
              <p className="w-[100px] h-[6px] bg-gray-500 rounded-md "></p>
              <span> 500</span>
            </div>
            <div className="flex gap-[4px] items-center">
              <IoStar className="text-gray-300" />
              <span>2</span>
              <p className="w-[50px] h-[6px] bg-yellow-500 rounded-md"> </p>
              <span> 200</span>
            </div>
            <div className="flex gap-[4px] items-center">
              <IoStar className="text-gray-300" />
              <span>1</span>
              <p className="w-[6px] h-[6px] rounded-full bg-red-500"> </p>
              <span> 50</span>
            </div>
          </div>
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 gap-[24px] justify-between">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className=" mt-[20px] shadow-xl rounded-xl p-4 flex  flex-col"
            >
              <div className="flex gap-[20px] ">
                <Avatar className="w-12 h-12 rounded-full ">
                  <AvatarImage src={imagePlaceholder.src} />
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">Towhidur Rahman</h2>

                  <div className="flex gap-[20px]">
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i}>
                          <IoStar className="text-yellow-500" />
                        </span>
                      ))}
                    </div>
                    <div>24-10-2025</div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[12px]">
                <div className="w-[]">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cum
                  ullam magni error, natus, impedit ipsam facere doloribus,
                  suscipit sunt harum ratione quas minus iusto aliquid? Officiis
                  voluptates tenetur labore iusto! Nostrum laudantium
                  necessitatibus consectetur quo tempore aliquam et non aliquid
                  molestiae amet.
                </div>
                <div className="flex items-center xl:gap-5 gap-3 w-full overflow-auto xl:pb-0 pb-2 max-h-[600]">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Image
                      key={i}
                      src={imagePlaceholder.src}
                      width={100}
                      height={100}
                      alt="product thumbnail"
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductReview;
