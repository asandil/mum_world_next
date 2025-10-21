import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const SearchModel = ({ open, setOpen }) => {
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
        <Input placeholder="Search..." />
      </DialogContent>
    </Dialog>
  );
};

export default SearchModel;
