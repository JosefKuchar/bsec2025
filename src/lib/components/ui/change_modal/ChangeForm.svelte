<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema as formSchema, type ChangeFormSchema } from './form-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createEventDispatcher } from 'svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import prisma from '$lib/prisma';
	import { goto, invalidateAll } from '$app/navigation';

	const dispatch = createEventDispatcher();

	let {
		data,
		change,
		types
	}: {
		data: { form: SuperValidated<Infer<ChangeFormSchema>> };
		change: {
			id: number;
			from: Date;
			to: Date;
			amount: number;
			type: {
				id: number;
				emoji: string;
				name: string;
			};
		};
		types: { id: number; emoji: string; name: string }[];
	} = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		dataType: 'json',
		onResult: ({ result }) => {
			if (result.type === 'success') {
				dispatch('success');
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form
	method="POST"
	onsubmit={(event) => {
		event.preventDefault();

		let type = types.find((type) => type.name === $formData.type);
		let body = JSON.stringify({
			id: change.id,
			from: change.from,
			to: change.to,
			amount: $formData.amount,
			type: type
		});

		console.log(body);

		try {
			fetch('/api/change/edit', {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			}).then(() => {
				goto('/changes');
			});
		} catch (error) {
			console.log(error);
		}
		console.log($formData);
	}}
	use:enhance
>
	<Select.Root type="single" bind:value={$formData.type} name={'type'}>
		<Select.Trigger>
			{$formData.type ? $formData.type.name : 'Vyberte si typ pohybu na účtu'}
		</Select.Trigger>
		<Select.Content>
			{#each types as type}
				<Select.Item value={type.name} label={type.name} />
			{/each}
		</Select.Content>
	</Select.Root>

	<Form.Field {form} name="amount">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Amount</Form.Label>
				<Input
					{...props}
					bind:value={$formData.amount}
					type="number"
					oninput={() => ($formData.amount = Number($formData.amount))}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
