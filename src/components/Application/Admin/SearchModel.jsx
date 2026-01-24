import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Fuse from "fuse.js";
import searchData from "@/lib/search";
import Image from "next/image";
import notFound from "@/assets/images/not-found.png";

const options = {
  keys: ["label", "description", "keywords"],
  threshold: 0.3,
};

const SearchModel = ({ open, setOpen }) => {
  const [query, setQuery] = useState("");

  const [results, setResult] = useState([]);

  const fuse = new Fuse(searchData, options);

  useEffect(() => {
    if (query.trim() === "") {
      setResult([]);
    }

    const res = fuse.search(query);
    console.log("Admin Search Section", res);
    setResult(res.map((r) => r.item));
  }, [query]);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Quick Search</DialogTitle>
          <DialogDescription>
            Find and naviagte to any admin section instantly. Type a keyword to
            get started.
          </DialogDescription>
        </DialogHeader>
        <Input
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <ul className="mt-4 max-h-60 overflow-y-auto">
          {results.map((item, index) => (
            <li key={index}>
              <Link
                href={item.url}
                className="block py-2 px-3 rounded hover:bg-muted"
                onClick={() => setOpen(false)}
              >
                <h4 className="font-medium">{item.label}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}

          {query && results.length === 0 && (
            <div className="text-center flex flex-col justify-center items-center">
              <div className="h-full w-full flex justify-center items-center">
                <Image
                  src={notFound.src}
                  width={notFound.width}
                  height={notFound.height}
                  alt="not-found"
                  className="w-20"
                />
              </div>
              <span className="text-red-500">No results found</span>
            </div>
          )}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModel;
