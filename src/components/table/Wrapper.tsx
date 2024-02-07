"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { columns } from "./Columns";
import { DataTable } from "./Table";
import { useState } from "react";

export default function Wrapper({ skeletonFiles }: any) {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  return (
    <>
      <Button onClick={() => setSort(sort === "desc" ? "asc" : "desc")}>
        Sort by {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      <DataTable columns={columns} data={skeletonFiles} />
    </>
  );
}
