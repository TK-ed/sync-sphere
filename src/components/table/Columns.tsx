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
      // @ts-ignore
      const extension = type.split("/")[1]; // image/jpeg => [image, jpeg]
      return (
        <div className="w-10">
          <FileIcon
            extension={extension}
            // @ts-ignore
            labelColor={COLOR_EXTENSION_MAP[extension]}
            // @ts-ignore
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
    cell: ({ renderValue, ...props }) => {
      const value = renderValue();

      // Check if the value is a Date object or a string that can be parsed into a Date
      // @ts-ignore
      const date = value instanceof Date ? value : new Date(value);

      // Check if date is valid before calling toLocaleString
      const formattedDate =
        date instanceof Date && !isNaN(date.getTime())
          ? date.toLocaleString()
          : "Invalid Date";

      return <span>{formattedDate}</span>;
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell({ renderValue, ...props }) {
      return (
        <a
          href={renderValue() as string}
          target="_blank"
          className="hover:underline hover:text-blue-400"
        >
          Download
        </a>
      );
    },
  },
];
