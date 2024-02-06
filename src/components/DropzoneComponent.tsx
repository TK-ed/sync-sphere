"use client";

import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { storage, supabase } from "../../supabase";

export default function DropzoneComponent() {
  const [loading, setLoading] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();

  const maxSize = 104857600;

  // const getFiles = async () => {
  //   const { data, error } = await storage.from("files").list("", {
  //     limit: 100,
  //     offset: 0,
  //     sortBy: { column: "name", order: "asc" },
  //   });
  //   console.log(data);
  // };
  // getFiles();

  const onDrop = (acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (file: File) => {
    if (loading) return;
    if (!user) return;
    setLoading(true);

    try {
      const { data, error } = await storage
        .from("files")
        .upload(file.name, file, {
          cacheControl: "3600",
          upsert: false,
        });
      console.log(data);
    } catch (error) {
      console.log(error);
    }

    // Generate a signed URL for the file
    const { data } = supabase.storage.from("files").getPublicUrl(file.name);
    let downloadUrl = data.publicUrl;
    console.log(downloadUrl);

    try {
      const { data, error } = await supabase.from("files").insert({
        user_id: user.id,
        filename: file.name,
        fullName: user.fullName,
        profileImg: user.imageUrl,
        created_at: new Date(),
        type: file.type,
        size: file.size,
        downloadUrl: downloadUrl,
      });
      console.log(data);
    } catch (error) {
      console.log(error);
    }
    const { datas } = await supabase.from("files").select();
    console.log(datas);

    setLoading(false);
  };

  return (
    <Dropzone minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;

        return (
          <section className="m-4 ">
            <div
              {...getRootProps()}
              className={cn(
                "w-full h-52 flex justify-center items-center p-5 border border-dashed rounded-lg text-center",
                isDragActive
                  ? "bg-[#035FFE] text-white animate-pulse"
                  : "bg-slate-100/50 dark:bg-slate-800/80 text-slate-400"
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload..."}
              {isDragActive && !isDragReject && "Drop to upload this file."}
              {isDragReject && "File type not accepted, sorry!"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">File is too large!</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}