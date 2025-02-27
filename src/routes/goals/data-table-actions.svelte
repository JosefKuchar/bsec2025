<script lang="ts">
    import Ellipsis from "lucide-svelte/icons/ellipsis";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import * as Form from "$lib/components/ui/form/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    let { id }: { id: string } = $props();

    let show = $state(false);
   </script>

<Dialog.Root bind:open={show}>
  <Dialog.Content>
  <Dialog.Header>
    <Dialog.Title>Edit Goal</Dialog.Title>
    <Dialog.Description>
    Create a new goal to track your progress. Fill out the form below to get started.
    </Dialog.Description>
  </Dialog.Header>

  <!-- form -->
  </Dialog.Content>
</Dialog.Root>
    
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
      <DropdownMenu.Item onclick={() => show = true}>
      Edit
    </DropdownMenu.Item>
      <DropdownMenu.Item 
        onclick={async () => {
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
    </DropdownMenu.Content>
   </DropdownMenu.Root>
