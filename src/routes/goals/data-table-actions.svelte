<script lang="ts">
    import Ellipsis from "lucide-svelte/icons/ellipsis";
    import { Button } from "$lib/components/ui/button/index.js";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
    import * as Dialog from "$lib/components/ui/dialog/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Input } from "$lib/components/ui/input/index.js";

    let { id }: { id: string } = $props();

    let show = $state(false);

    async function handleFormShow(id) {
          try {
            const response = await fetch(`/api/goals/${id}`);
            if (!response.ok) throw new Error('Failed to fetch goal data');
            const goalData = await response.json();
            console.log('Goal data:', goalData);
            // Populate form fields with fetched data
            document.querySelector('input[label="Name"]').value = goalData.name;
            document.querySelector('input[label="Description"]').value = goalData.description;
            document.querySelector('input[label="Amount"]').value = goalData.value;
          } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to fetch goal data');
          }
    }
    
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
   <!-- Add name text above the input -->
   <Label for="Name">Goal Name</Label>
   <Input label="Name" />
   <Label for="Description">Goal Description</Label>
   <Input label="Description" />
   <Label for="Amount">Goal Amount</Label>
   <Input label="Amount" />
   <Button onclick={async () => {
    console.log('Save button clicked');
    const name = document.querySelector('input[label="Name"]').value;
    const description = document.querySelector('input[label="Description"]').value;
    console.log(name, description);
    try {
      const response = await fetch(`/api/goals/edit`, {  // No need to add `/${id}`
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, name, description, amount }) // Include `id` in the body
      });

      if (!response.ok) throw new Error('Update failed');
      show = false;
      window.location.reload();
      console.log('Goal updated successfully');
    } catch (error) {
      console.error('Update error:', error);
    }
  }}>
    Save
  </Button>
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
      <DropdownMenu.Item onclick={() => show = true && handleFormShow(id)}>
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
