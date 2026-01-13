import React from "react";
import loading from "@/assets/images/loading.svg";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center mx-auto">
      <Image alt="loader" src={loading.src} height={80} width={80} />
      <p className="text-primary text-[22px] " >Loading...</p>
    </div>
  );
};

export default Loading;
