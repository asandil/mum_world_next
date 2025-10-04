"use client";
import BreadCrumb from "@/components/Application/Admin/BreadCrumb";
import UploadMedia from "@/components/Application/Admin/UploadMedia";
import { ADMIN_DASHBOARD } from "@/routes/AdminPanelRoute";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import Media from "@/components/Application/Admin/Media";

const breadCrumbData = [
  { href: ADMIN_DASHBOARD, label: "Home" },
  { href: "", label: "Media" },
];

const MediaPage = () => {

  const [deleteType, setDeleteType] = useState("SD");
  const [selectedMedia, setSelectedMedia] = useState("SD");

  const fetchMedia = async (page, deleteType) => {
    const { data: response } = await axios.get(
      `/api/media?page=${page}&&limit=10&&deleteType=${deleteType}`
    );
    console.log("meida response", response);
    return response;
  };

   const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["media-data", deleteType],
    queryFn: async({ pageParam }) => await fetchMedia(pageParam, deleteType),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      const nextPage = pages.length;
      return lastPage.hasMore ? nextPage : undefined;
    },
  });

  console.log("media Data in UI", data)

    const handleDelete = () => {

  }
  

  return (
    <div>
      <BreadCrumb breadCrumbData={breadCrumbData} />
      <Card className="py-0 rounded shadow-sm">
        <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
          <div className="flex justify-between items-center">
            <h4 className="font-semibold text-xl uppercase">Media</h4>
            <div className="flex items-center gap-5">
              <UploadMedia />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {
            status === "pending" ?
            <> <div>Loading...</div> </>
            :
            status === "error" ?
            <div className="text-red-500 text-sm" >
              {error.message}
            </div>
            :
            <div className="grid lg:grid-cols-5 sm:grid-cols-3 grid-cols-2 gap-2 mb-5" >
              {data?.pages?.map((page, index) => (
                <React.Fragment key={index} >
                  {
                    page?.mediaData?.map((media) => (
                      <div>
                        <Media key={media._id}
                        media={media}
                        handleDelete={handleDelete}
                        deleteType={deleteType}
                        selectedMedia={selectedMedia}
                        setSelectedMedia={setSelectedMedia}
                      />
                      </div>
                    ))
                  }
                </React.Fragment>
              ))}
            </div>
          }
        </CardContent>
      </Card>
    </div>
  );
};

export default MediaPage;
