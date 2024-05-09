"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppStore } from "../../store/store";
import { useUser } from "@clerk/nextjs";
import { supabase } from "../../supabase";
import toast from "react-hot-toast";

export function DeleteModal() {
  const { user } = useUser(); // Invoke the useUser function

  const [fileName, isDeleteModalOpen, setIsDeleteModalOpen] = useAppStore(
    (state) => [
      state.fileName,
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
    ]
  );

  async function deleteFile() {
    if (!user || !fileName) return;
    console.log(fileName);

    const toastId = toast.loading("Deleting file...");
    toast.loading(fileName);

    try {
      const { data: storageData, error: storageError } = await supabase.storage
        .from("files")
        .remove([`${fileName}`]);
      if (storageError) {
        console.error("Error removing from storage:", storageError);
      } else {
        console.log("Removed from storage successfully:", storageData);
      }

      const { data: tableData, error: tableError } = await supabase
        .from("files")
        .delete()
        .eq("filename", fileName);
      console.log(tableData);

      toast.success("File deleted successfully!", { id: toastId });

      setIsDeleteModalOpen(false);
      window.location.reload();
    } catch (err) {
      toast.error("Error deleting file!", { id: toastId });
      console.log(err);
    }
  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure??</DialogTitle>
          <DialogDescription>
            This action cannot be undone and will permanently delete the file.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>
          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            variant={"destructive"}
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
