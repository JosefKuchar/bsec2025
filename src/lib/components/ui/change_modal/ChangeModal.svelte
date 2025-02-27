<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { getFrequencyString } from '$lib/utils';
	const { change } = $props();
	const desc = change.type.emoji + ' ' + change.type.name;
	const date = new Date(change.from).toLocaleString() + ' - ' + new Date(change.to).toLocaleString();
	const freq = getFrequencyString(change.frequency);
</script>

<Dialog.Root>
	<Dialog.Trigger class="size-full p-4">
		<div class="flex flex-row justify-between items-center">
			<p class="text-lg font-bold">{desc}</p>
			<p class="text-sm text-gray-500">{freq}</p>
			<p class="text-sm text-gray-500">{date}</p>
		</div>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
			<Dialog.Description>
				This action cannot be undone. This will permanently delete your account and remove your data
				from our servers.
			</Dialog.Description>
		</Dialog.Header>
	</Dialog.Content>
</Dialog.Root>
