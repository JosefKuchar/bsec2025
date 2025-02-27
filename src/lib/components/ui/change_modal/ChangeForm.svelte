<script lang="ts">
	// Import necessary types or interfaces if you have them
	// import type { Change } from '$lib/types'; // Example: Assuming you have a Change type

	// Define variables to hold form data
	let amount: number = 0;
	let from: string = ''; // Or Date, depending on your needs
	let to: string = '';
	let changeTypeId: number | null = null; // Assuming changeTypeId is a number
	let description: string = '';

	// Example: Assuming you have a list of change types to populate a select
	export let changeTypes: { id: number; name: string }[] = [];

	// Event dispatcher to emit the form data
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	// Function to handle form submission
	function handleSubmit(event: Event) {
		event.preventDefault(); // Prevent default form submission

		// Create an object with the form data
		const formData = {
			amount,
			from,
			to,
			changeTypeId,
			description
		};

		// Dispatch a custom event with the form data
		dispatch('formSubmit', formData);

		// Optionally, reset the form
		amount = 0;
		from = '';
		to = '';
		changeTypeId = null;
		description = '';
	}
</script>

<form on:submit={handleSubmit} class="space-y-4">
	<div>
		<label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
		<input
			type="number"
			id="amount"
			bind:value={amount}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		/>
	</div>

	<div>
		<label for="from" class="block text-sm font-medium text-gray-700">From</label>
		<input
			type="date"
			id="from"
			bind:value={from}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		/>
	</div>

	<div>
		<label for="to" class="block text-sm font-medium text-gray-700">To</label>
		<input
			type="date"
			id="to"
			bind:value={to}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		/>
	</div>

	<div>
		<label for="changeType" class="block text-sm font-medium text-gray-700">Change Type</label>
		<select
			id="changeType"
			bind:value={changeTypeId}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		>
			<option value="">Select a type</option>
			{#each changeTypes as type}
				<option value={type.id}>{type.name}</option>
			{/each}
		</select>
	</div>

	<div>
		<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
		<textarea
			id="description"
			bind:value={description}
			class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
		/>
	</div>

	<button
		type="submit"
		class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	>
		Submit
	</button>
</form>
