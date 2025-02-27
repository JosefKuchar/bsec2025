<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	let changes = data.changes;
	import ChangeModal from '$lib/components/ui/change_modal/ChangeModal.svelte';
	console.debug(changes);
</script>

<svelte:head>
	<title>Changes</title>
	<meta name="description" content="List of changes" />
</svelte:head>

<div class="container mx-auto py-8">
	<h1 class="mb-4 text-3xl font-bold">Changes</h1>

	<!-- Placeholder for the list -->
	{#if changes.length === 0}
		<p>No changes to display.</p>
	{:else}
		<ul class="list-inside">
			{#each changes as change, index}
				<li
					class="mb-2 rounded-lg border shadow-sm transition-shadow duration-200 hover:shadow-md"
				>
					<div>
						<ChangeModal {change} />
					</div>
				</li>
			{/each}
		</ul>
	{/if}
</div>