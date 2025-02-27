<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { goalSchema, type GoalSchema } from './form-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createEventDispatcher } from 'svelte';
	import * as Select from '$lib/components/ui/select/index.js';

	const dispatch = createEventDispatcher();

	let { data }: { data: { form: SuperValidated<Infer<GoalSchema>> } } = $props();

	const form = superForm(data.form, {
		validators: zodClient(goalSchema),
		onResult: ({ result }) => {
			if (result.success) {
				dispatch('success');
			}
		}
	});

	const { form: formData, enhance } = form;

	import { onMount } from 'svelte';

	onMount(() => {
		formData.type = Number(formData.type);
		// if (formData.type !== undefined) {
		//   formData.type = Number(formData.type);
		// }
		if (formData.amount !== undefined) {
			formData.amount = Number(formData.amount);
		}
	});
</script>

<form method="POST" use:enhance>
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Název</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="description">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Popis</Form.Label>
				<Input {...props} bind:value={$formData.description} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="value">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Cílová hodnota</Form.Label>
				<Input {...props} bind:value={$formData.value} type="number" />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Field {form} name="type">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Type</Form.Label>
				<!-- Convert select value from string to number -->
				<Select.Root type="single" name={props.name} bind:value={$formData.type}>
					<Select.Trigger {...props}>
						{$formData.type == '0'
							? 'Procenta'
							: $formData.type == '1'
								? 'Absolutní částka'
								: 'Vyberte typ cíle'}
					</Select.Trigger>
					<Select.Content>
						<Select.Item value="0">Procenta</Select.Item>
						<Select.Item value="1">Absolutní částka</Select.Item>
					</Select.Content>
				</Select.Root>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button>Submit</Form.Button>
</form>
