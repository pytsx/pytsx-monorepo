import { Trash } from "lucide-react";
import React from "react";

export function DeleteComponent({ handleDelete }: { handleDelete: () => void }) {
  return (
    <div className="cursor-pointer absolute bg-destructive px-2.5 py-1 text-xs font-bold -top-[25px] -right-[1px] rounded-none rounded-t-lg ">
      <Trash
        className="text-red-950"
        size={16}
        onClick={handleDelete}
      />
    </div>
  )
}