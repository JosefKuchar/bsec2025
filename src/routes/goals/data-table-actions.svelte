<script lang="ts">
    import Ellipsis from "lucide-svelte/icons/ellipsis";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    
    let { id }: { id: string } = $props();
   </script>
    
   <DropdownMenu.Root>
    <DropdownMenu.Trigger>
     {#snippet child({ props })}
      <Button
       {...props}
       variant="ghost"
       size="icon"
       class="relative size-8 p-0"
      >
       <span class="sr-only">Open menu</span>
       <Ellipsis />
      </Button>
     {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
     <DropdownMenu.Group>
      <DropdownMenu.GroupHeading>Actions</DropdownMenu.GroupHeading>
      <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id)}>
       Copy ID
      </DropdownMenu.Item>
      <DropdownMenu.Item 
        on:click={async () => {
          try {
            const response = await fetch('/api/goals/delete', {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id })
            });
            
            if (!response.ok) throw new Error('Delete failed');
            window.location.reload();
          } catch (error) {
            console.error('Delete error:', error);
            alert('Failed to delete goal');
          }
        }}
      >
       Delete
      </DropdownMenu.Item>
     </DropdownMenu.Group>
     <DropdownMenu.Separator />
     <DropdownMenu.Item on:click={() => alert('View customer - Not implemented')}>View customer</DropdownMenu.Item>
     <DropdownMenu.Item on:click={() => alert('View payment details - Not implemented')}>View payment details</DropdownMenu.Item>
    </DropdownMenu.Content>
   </DropdownMenu.Root>
