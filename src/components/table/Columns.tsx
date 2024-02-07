"use client";

import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";
import { COLOR_EXTENSION_MAP } from "../../../colors";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "type",
    header: "type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue();
      const extension: string = type.split("/")[1]; // image/jpeg => [image, jpeg]
      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            // @ts-ignore
            labelColor={COLOR_EXTENSION_MAP[extension]}
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },
  {
    accessorKey: "fileName",
    header: "Filename",
  },
  {
    accessorKey: "createdAt",
    header: "Date added",
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "download",
    header: "Link",
    cell({ renderValue, ...props }) {
      return (
        <a href={renderValue() as string} target="_blank">
          Download
        </a>
      );
    },
  },
];
