"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { columns } from "./Columns";
import { DataTable } from "./Table";
import { useEffect, useState } from "react";
import { Skeleton } from "../Skeleton";
import { supabase } from "../../../supabase";

export default function Wrapper({ skeletonFiles }: any) {
  const { user } = useUser();
  const [sort, setSort] = useState<"asc" | "desc">("desc");
  const [initialFiles, setInitialFiles] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  console.log(initialFiles);

  const ascFiles = async () => {
    const { data, error } = await supabase
      .from("files")
      .select()
      .order("created_at", { ascending: true });
    console.log(data);
  };

  const descFiles = async () => {
    const { data, error } = await supabase
      .from("files")
      .select()
      .order("created_at", { ascending: false });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const { data, error } = await supabase
          .from("files")
          .select()
          .order("created_at", { ascending: true });

        console.log(data);

        if (error) {
          throw error;
        }

        setInitialFiles(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [sort]);

  if (loading || !initialFiles) {
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {initialFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-4 p-5 w-full"
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}

          {initialFiles.length === 0 && (
            <div className="flex items-center space-x-4 p-5 w-full">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      <Button
        onClick={() => setSort(sort === "desc" ? "asc" : "desc")}
        className="items-end"
        onClickCapture={() => (sort === "asc" ? ascFiles() : descFiles())}
      >
        Sort by {sort === "desc" ? "Newest" : "Oldest"}
      </Button>
      {loading && <Skeleton className={"items-center"} />}
      {!loading && <DataTable columns={columns} data={skeletonFiles} />}
    </>
  );
}
