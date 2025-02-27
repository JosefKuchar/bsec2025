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

	// Import the Form component
	import Form from '$lib/components/ui/form/Form.svelte';
	import Input from '$lib/components/ui/form/Input.svelte';
	import Select from '$lib/components/ui/form/Select.svelte';
	import Textarea from '$lib/components/ui/form/Textarea.svelte';

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

<Form on:submit={handleSubmit}>
	<Input type="number" label="Amount" bind:value={amount} />
	<Input type="date" label="From" bind:value={from} />
	<Input type="date" label="To" bind:value={to} />
	<Select
		label="Change Type"
		bind:value={changeTypeId}
		options={changeTypes.map((type) => ({ value: type.id, label: type.name }))}
	/>
	<Textarea label="Description" bind:value={description} />
	<button
		type="submit"
		class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
	>
		Submit
	</button>
</Form>
