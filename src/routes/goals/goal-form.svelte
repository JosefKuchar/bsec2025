<script lang="ts">
  import * as Form from "$lib/components/ui/form/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { formSchema, type FormSchema } from "./form-schema";
  import {
    type SuperValidated,
    type Infer,
    superForm,
  } from "sveltekit-superforms";
  import { zodClient } from "sveltekit-superforms/adapters";

  export let formData: SuperValidated<Infer<FormSchema>>;
  export let title = "Goal";
  export let description = "Configure your goal settings";
  export let submitText = "Submit";

  const form = superForm(formData, {
    validators: zodClient(formSchema),
  });

  const { form: formValues, enhance } = form;
</script>

<form method="POST" use:enhance class="space-y-4">
  <h2 class="text-lg font-semibold">{title}</h2>
  <p class="text-sm text-muted-foreground">{description}</p>

  <Form.Field {form} name="name">
    <Form.Control>
      <Form.Label>Goal Name</Form.Label>
      <Input bind:value={$formValues.name} />
    </Form.Control>
    <Form.Description>Enter a descriptive name for your goal</Form.Description>
    <Form.FieldErrors />
  </Form.Field>

  <div class="flex justify-end gap-2 pt-4">
    <Form.Button type="button" variant="outline" on:click={() => dispatch('cancel')}>
      Cancel
    </Form.Button>
    <Form.Button>{submitText}</Form.Button>
  </div>
</form>

<<<<<<< SEARCH
