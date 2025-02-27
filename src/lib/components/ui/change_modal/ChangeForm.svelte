<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema as formSchema, type ChangeFormSchema } from './form-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createEventDispatcher } from 'svelte';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import prisma from '$lib/prisma';

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
			type: { id: number; emoji: string; name: string };
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
	onsubmit={(event: any) => {
		const formData = new FormData(event.target);

		console.log('Form data submitted:', formData);

		fetch('/api/changes', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(formData)
		})
			.then((response) => response.json())
			.then((data) => {
				console.log('Success:', data);
				// closeModal();
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	}}
	use:enhance
>
	<Form.Fieldset {form} name="type">
		<Form.Legend>Type</Form.Legend>
		<RadioGroup.Root
			bind:value={$formData.type}
			class="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
		>
			<DropdownMenu.Root>
				<DropdownMenu.Trigger class="size-full"
					><div class="flex justify-between">
						<p>Typ pohybu</p>
						<sup class="text-xl">⌄</sup>
					</div></DropdownMenu.Trigger
				>
				<DropdownMenu.Content>
					<DropdownMenu.Group>
						<DropdownMenu.Item>
							<Form.Control>
								{#snippet children({ props })}
									<RadioGroup.Item value="Příjem" {...props} />
									<Form.Label class="font-normal">Příjem</Form.Label>
								{/snippet}
							</Form.Control>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<Form.Control>
								{#snippet children({ props })}
									<RadioGroup.Item value="Výdaj" {...props} />
									<Form.Label class="font-normal">Výdaj</Form.Label>
								{/snippet}
							</Form.Control>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<Form.Control>
								{#snippet children({ props })}
									<RadioGroup.Item value="Dar" {...props} />
									<Form.Label class="font-normal">Dar</Form.Label>
								{/snippet}
							</Form.Control>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<Form.Control>
								{#snippet children({ props })}
									<RadioGroup.Item value="Potraviny" {...props} />
									<Form.Label class="font-normal">Potraviny</Form.Label>
								{/snippet}
							</Form.Control>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<Form.Control>
								{#snippet children({ props })}
									<RadioGroup.Item value="Dům" {...props} />
									<Form.Label class="font-normal">Dům</Form.Label>
								{/snippet}
							</Form.Control>
						</DropdownMenu.Item>
						<DropdownMenu.Item>
							<Form.Control>
								{#snippet children({ props })}
									<RadioGroup.Item value="Ostatní" {...props} />
									<Form.Label class="font-normal">Ostatní</Form.Label>
								{/snippet}
							</Form.Control>
						</DropdownMenu.Item>
					</DropdownMenu.Group>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</RadioGroup.Root>
	</Form.Fieldset>

	<Form.Field {form} name="amount">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Amount</Form.Label>
				<Input {...props} bind:value={$formData.amount} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
