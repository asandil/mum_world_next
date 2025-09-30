import Image from "next/image";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { ADMIN_MEDIA_EDIT } from "@/routes/AdminPanelRoute";
import { MdOutlineEdit } from "react-icons/md";
import { LuTrash } from "react-icons/lu";
import { IoIosLink } from "react-icons/io";
import { showToast } from "@/lib/showToast";

const Media = ({
  media,
  handleDelete,
  deleteType,
  selectedMedia,
  setSelectedMedia,
}) => {
  const handleCheck = () => {};

  const handleCopyLink = async (url) => {
    await navigator.clipboard.writeText(url)
    showToast("success", "Link copied.")
  }

  return (
    <div className="border border-gray-200 dark:border-gray-800 relative group overflow-hidden">
      <div className="absolute top-2 left-2 z-20">
        <Checkbox
          checked={selectedMedia.includes(media._id)}
          onCheckedChange={handleCheck}
          className="border-primary"
        />
      </div>

      <div className="absolute top-2 right-2 z-20" >
        <DropdownMenu>
          <DropdownMenuTrigger>
            <span className="w-7 h-7 flex items-center justify-center rounded-full bg-black/50 cursor-pointer" >
              <BsThreeDotsVertical />
            </span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" >
            {deleteType === "SD" && 
              <>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link href={ADMIN_MEDIA_EDIT(media._id)} >
                  <MdOutlineEdit/>
                  Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem  className="cursor-pointer" onClick={() => handleCopyLink(media.secure_url)}>
                  <IoIosLink/>
                  Copy Link
                </DropdownMenuItem>
              </>
            }
            <DropdownMenuItem  className="cursor-pointer">
                  <LuTrash color="red" />
                  {deleteType === "SD" ? "Move Into Trash" : "Delete Permanently"}
                </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full h-full absolute z-10 transition-all duration-150 ease-in group-hover:bg-black/30" >

      </div>

      <div>
        <Image
          src={media?.secure_url}
          alt={media?.alt || "Image"}
          height={300}
          width={300}
          className="object-cover w-full sm:h-[200px] h-[150px]"
        />
      </div>
    </div>
  );
};

export default Media;
