<script lang="ts">
	// You'll fetch your data here and assign it to a variable, e.g., 'changes'
	// let changes: any[] = []; // Replace 'any[]' with the correct type for your data

	// Example data (remove this when you fetch your real data)
	let changes = [
		{ id: 1, description: 'Change 1' },
		{ id: 2, description: 'Change 2' }
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
