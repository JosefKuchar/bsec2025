import type { ColumnDef } from "@tanstack/table-core";
import { createRawSnippet } from "svelte";
import { renderSnippet } from "$lib/components/ui/data-table/index.js";
import { renderComponent } from "$lib/components/ui/data-table/index.js";
import DataTableActions from "./data-table-actions.svelte";
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Change = {
    id: string | number;
    name: string;
    description: string;
    type: "percentage" | "amount";
    value: number;
};
 
export const columns: ColumnDef<Change>[] = [
    {
        accessorKey: "name",
        header: "Title",
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "type",
        header: "Type",
    },
    {
        accessorKey: "value",
        header: "Value",
    },
    {
        id: "actions",
        cell: ({ row }) => {
          // You can pass whatever you need from `row.original` to the component
          return renderComponent(DataTableActions, { id: row.original.id });
        },
      },
  ];
