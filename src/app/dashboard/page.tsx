"use client";
import DropzoneComponent from "@/components/DropzoneComponent";
import { supabase } from "../../../supabase";
import { Button } from "@/components/ui/button";

export default function DashBoard() {

  // try {
  //   const { data, error } = await supabase.from("files").select();
  //   console.log(data);
  // } catch (error) {
  //   console.log(error);
  // }

  return (
    <>
      {/* <h1>{userId}</h1> */}
      <DropzoneComponent />
      <Button>Click</Button>
    </>
  );
}
