<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	let changes = data.changes;
	let types = data.types;
	import ChangeModal from '$lib/components/ui/change_modal/ChangeModal.svelte';
	import { invalidateAll } from '$app/navigation';
	import { Card } from '$lib/components/ui/card';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Button from '$lib/components/ui/button/button.svelte';

	const handleCreateRandom = async () => {
		await fetch('/api/change/create-random', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
		// Invalidat data
		invalidateAll();
	};
</script>

<svelte:head>
	<title>Pohyby</title>
	<meta name="description" content="List of changes" />
</svelte:head>

<div class="container mx-auto py-8">
	<Card>
		<CardHeader>
			<CardTitle>Pohyby</CardTitle>
		</CardHeader>
		<CardContent>
			<Button onclick={handleCreateRandom} class="mb-4">Vytvořit náhodný pohyb</Button>
			{#if changes.length === 0}
				<p>No changes to display.</p>
			{:else}
				<ul class="list-inside">
					{#each changes as change}
						<li
							class="mb-2 rounded-lg border shadow-sm transition-shadow duration-200 hover:shadow-md"
						>
							<div>
								<ChangeModal {change} {types} />
							</div>
						</li>
					{/each}
				</ul>
			{/if}
		</CardContent>
	</Card>
</div>
