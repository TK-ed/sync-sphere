import DropzoneComponent from "@/components/DropzoneComponent";
import { supabase } from "../../../supabase";
import { auth } from "@clerk/nextjs";
import Wrapper from "@/components/table/Wrapper";
import Skeleton from "@/components/Skeleton";

export default async function DashBoard() {
  const { userId } = auth();
  const results = await supabase
    .from("files")
    .select()
    .filter("user_id", "eq", userId);

  const skeletonFiles = results.data?.map((data) => ({
    user_id: data.user_id,
    fileName: data.filename,
    fullName: data.fullName,
    size: data.size,
    type: data.type,
    downloadUrl: data.downloadUrl,
    createdAt: data.created_at || null,
  }));

  console.log(skeletonFiles);

  return (
    <div className="border-t">
      {/* <h1>{userId}</h1> */}
      <DropzoneComponent />
      <section className="container space-y-5">
        <h2>All files...</h2>

        <Skeleton />
        <Wrapper skeletonFiles={skeletonFiles} />
      </section>
    </div>
  );
}
