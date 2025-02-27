<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
</script>

<Dialog.Root>
    <div class="flex justify-center pt-[20px]">
        <Dialog.Trigger><Button>Add Change</Button></Dialog.Trigger>
    </div>
    <Dialog.Content>
      <Dialog.Header>
    <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
    <Dialog.Description>
      This action cannot be undone. This will permanently delete your account
      and remove your data from our servers.
    </Dialog.Description>
      </Dialog.Header>
        <Button class="w-fit">Save</Button>
    </Dialog.Content>
</Dialog.Root>