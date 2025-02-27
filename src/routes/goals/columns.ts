import type { ColumnDef } from '@tanstack/table-core';
import { createRawSnippet } from 'svelte';
import { renderSnippet } from '$lib/components/ui/data-table/index.js';
import { renderComponent } from '$lib/components/ui/data-table/index.js';
import DataTableActions from './data-table-actions.svelte';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Goal = {
	id: string | number;
	name: string;
	description: string;
	type: 'percentage' | 'amount';
	value: number;
};

export const columns: ColumnDef<Goal>[] = [
	{
		accessorKey: 'name',
		header: 'Title'
	},
	{
		accessorKey: 'description',
		header: 'Description'
	},
	{
		accessorKey: 'value',
		header: 'Value',
		cell: ({ row }) => {
			// if type is percentage, show value as a percentage
			console.log(row.original.type);
			if (row.original.type == 0) {
				// percent, style it green if positive, red if negative
				return `${row.original.value}%`;
			} else if (row.original.type == 2) {
				// difference
				return `±${row.original.value}`;
			} else {
				// amount
				return row.original.value;
			}
		}
	},
	{
		id: 'actions',
		cell: ({ row }) => {
			// You can pass whatever you need from `row.original` to the component
			return renderComponent(DataTableActions, { id: row.original.id });
		}
	}
];
