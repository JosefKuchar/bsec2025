<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import ChangeForm from './ChangeForm.svelte';
	const { change, types } = $props();
	const id = change.id;
	const desc = change.type.emoji + ' ' + change.type.name;
	const date = new Date(change.from).toLocaleString();
</script>

<Dialog.Root>
	<Dialog.Trigger class="size-full p-4">
		<div class="flex flex-row items-center justify-between">
			<p class="text-lg font-bold">{desc}</p>
			<p class="text-sm text-gray-500">{date}</p>
		</div>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Upravit pohyb účtu</Dialog.Title>
		</Dialog.Header>
		{console.log('modal', change)}
		<ChangeForm data={{ form: change }} {change} {types} />
	</Dialog.Content>
</Dialog.Root>
