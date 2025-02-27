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
 
 let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } =
  $props();
 
 const form = superForm(data.form, {
  validators: zodClient(formSchema),
 });
 
 const { form: formData, enhance } = form;
</script>
 
<form method="POST" use:enhance>
 <Form.Field {form} name="name">
  <Form.Control>
   {#snippet children({ props })}
    <Form.Label>Username</Form.Label>
    <Input {...props} bind:value={$formData.name} />
   {/snippet}
  </Form.Control>
  <Form.Description>This is your public display name.</Form.Description>
  <Form.FieldErrors />
 </Form.Field>
 <Form.Button>Submit</Form.Button>
</form>