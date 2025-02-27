<script lang="ts" generics="TData, TValue">
    import { type ColumnDef, getCoreRowModel } from "@tanstack/table-core";
    import {
     createSvelteTable,
     FlexRender,
    } from "$lib/components/ui/data-table/index.js";
    import * as Table from "$lib/components/ui/table/index.js";
    
    type DataTableProps<TData, TValue> = {
     columns: ColumnDef<TData, TValue>[];
    };

    function mapTypeValue(value: number): string | number {
      switch(value) {
        case 0: return 'Percentage';
        case 1: return 'Abs';
        case 2: return 'Difference';
        default: return value;
      }
    }

    let { data, columns }: DataTableProps<TData, TValue> = $props();

    const table = createSvelteTable({
     get data() {
      return data;
     },
     columns,
     getCoreRowModel: getCoreRowModel(),
    });
   </script>
    
    <div class="rounded-24 overflow-hidden">
        <Table.Root class="w-full border-collapse">
          <!-- Table Header -->
          <Table.Header class="bg-red">
            {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
              <Table.Row>
                {#each headerGroup.headers as header (header.id)}
                  <Table.Head class="text-white text-left text-bold">
                    {#if !header.isPlaceholder}
                      <FlexRender content={header.column.columnDef.header} context={header.getContext()} />
                    {/if}
                  </Table.Head>
                {/each}
              </Table.Row>
            {/each}
          </Table.Header>
      
          <!-- Table Body -->
          <Table.Body>
            {#each table.getRowModel().rows as row (row.id)}
              <Table.Row 
                class="border-b border-gray-700 hover:bg-gray-700 transition duration-200"
                data-state={row.getIsSelected() && "selected"}
              >
                {#each row.getVisibleCells() as cell (cell.id)}
                  <Table.Cell class="px-4 py-3">
                    {#if cell.column.id === 'type'}
                      {mapTypeValue(cell.getValue() as number)}
                    {:else}
                      <FlexRender content={cell.column.columnDef.cell} context={cell.getContext()} />
                    {/if}
                  </Table.Cell>
                {/each}
              </Table.Row>
            {:else}
              <Table.Row>
                <Table.Cell colspan={columns.length} class="h-24 text-center text-gray-400">
                  No results.
                </Table.Cell>
              </Table.Row>
            {/each}
          </Table.Body>
        </Table.Root>
      </div>
      
