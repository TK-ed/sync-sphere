import DropzoneComponent from "@/components/DropzoneComponent";
import { auth } from "@clerk/nextjs";

export default function DashBoard() {
  const { userId } = auth();

  return (
    <>
      {/* <h1>{userId}</h1> */}
      <DropzoneComponent />
    </>
  );
}
