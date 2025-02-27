<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	let changes = data.changes;
</script>

<svelte:head>
	<title>Changes</title>
	<meta name="description" content="List of changes" />
</svelte:head>

<div class="container mx-auto py-8">
	<h1 class="text-3xl font-bold mb-4">Changes</h1>

	<!-- Placeholder for the list -->
	{#if changes.length === 0}
		<p>No changes to display.</p>
	{:else}
		<ul class="list-inside">
			{#each changes as change}
				<li class="mb-2">{change.typeId} {change.amount} {change.frequency}</li>
			{/each}
		</ul>
	{/if}
</div>
