<script lang="ts">
	export let changes = [
		{ id: 1, description: 'Fallback change 1' },
		{ id: 2, description: 'Fallback change 2' }
	];
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
		<ul class="list-disc list-inside">
			{#each changes as change}
				<li class="mb-2">{change.description}</li>
			{/each}
		</ul>
	{/if}
</div>
