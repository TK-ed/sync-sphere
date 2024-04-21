import DropzoneComponent from "@/components/DropzoneComponent";
import { supabase } from "../../../supabase";
import { auth } from "@clerk/nextjs";
import Wrapper from "@/components/table/Wrapper";

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

  return (
    <div className="border-t">
      <DropzoneComponent />
      <section className="container space-y-5">
        <Wrapper skeletonFiles={skeletonFiles} />
      </section>
    </div>
  );
}
