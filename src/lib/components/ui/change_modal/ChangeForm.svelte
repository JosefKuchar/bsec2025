<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { formSchema as formSchema, type ChangeFormSchema } from './form-schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { createEventDispatcher } from 'svelte';
	import { Frequency } from '$lib/enums';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
  import { getfrequencyFromString } from '$lib/utils';
	import prisma from '$lib/prisma';

	const dispatch = createEventDispatcher();

	let {
		data,
		change
	}: {
		data: { form: SuperValidated<Infer<ChangeFormSchema>> };
		change: {
			id: number;
			from: Date;
			to: Date;
			amount: number;
			frequency: string;
			type: { id: number; emoji: string; name: string };
		};
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

<form method="POST" use:enhance>
	<Form.Field {form} name="amount">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Amount</Form.Label>
				<Input {...props} bind:value={$formData.amount} />
			{/snippet}
		</Form.Control>
		<Form.Description>Amount desc</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Fieldset {form} name="frequency" class="space-y-3">
    <Form.Legend>Frequency</Form.Legend>
    <RadioGroup.Root
      bind:value={$formData.frequency}
      class="flex flex-col space-y-1"
      name="type"
    >
      <div class="flex items-center space-x-3 space-y-0">
        <Form.Control>
          {#snippet children({ props })}
            <RadioGroup.Item value="OneTime" {...props} />
            <Form.Label class="font-normal">Jednorazove</Form.Label>
          {/snippet}
        </Form.Control>
      </div>
      <div class="flex items-center space-x-3 space-y-0">
        <Form.Control>
          {#snippet children({ props })}
            <RadioGroup.Item value="mentions" {...props} />
            <Form.Label class="font-normal"
              >Direction messages and mentions</Form.Label
            >
          {/snippet}
        </Form.Control>
      </div>
      <div class="flex items-center space-x-3 space-y-0">
        <Form.Control>
          {#snippet children({ props })}
            <RadioGroup.Item value="none" {...props} />
            <Form.Label class="font-normal">Nothing</Form.Label>
          {/snippet}
        </Form.Control>
      </div>
    </RadioGroup.Root>
    <Form.FieldErrors />
  </Form.Fieldset>

	<Form.Button>Submit</Form.Button>
</form>
