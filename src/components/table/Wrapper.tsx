"use client";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { columns } from "./Columns";
import { DataTable } from "./Table";
import { useEffect, useState } from "react";
import { supabase } from "../../../supabase";
import { Skeleton } from "@/components/ui/skeleton";

export default function Wrapper({ skeletonFiles }: any) {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<Array<any>>([]);
  const [ascendingOrder, setAscendingOrder] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("files")
          .select()
          .order("created_at", { ascending: ascendingOrder });
        // @ts-ignore
        setInitialFiles(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [ascendingOrder]);

  if (!initialFiles || loading) {
    return (
      <div className="flex flex-col">
        <Button variant={"outline"} className="ml-auto w-36 h-10 mb-5">
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="border rounded-lg">
          <div className="border-b h-12" />
          {/* @ts-ignore */}
          {skeletonFiles.map((file) => (
            <div
              key={file.id}
              className="flex items-center space-x-4 p-5 w-full"
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}

          {skeletonFiles.length === 0 && (
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
    <div className="flex flex-col space-y-5 pb-10">
      <Button
        className="ml-auto items-end w-fit"
        onClick={() => {
          setAscendingOrder((prevOrder) => !prevOrder);
        }}
      >
        Sort by {""}
        {ascendingOrder ? "Newest" : "Oldest"}
        {""}
      </Button>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
}
