<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";
  import type { PageData } from "../$types";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import GoalForm from "./goal-form.svelte"; // Import your GoalForm component
  
  export let data: PageData;

  let dialogOpen = false;
  let dialogOpen = false;
</script>

<div class="space-y-4">
	<Dialog.Root bind:open={dialogOpen}>
		<Dialog.Trigger>New Goal</Dialog.Trigger>
		<Dialog.Content>
		  <Dialog.Header>
			<Dialog.Title>New Goal</Dialog.Title>
			<Dialog.Description>
			  Create a new goal to track your progress. Fill out the form below to get started.
			</Dialog.Description>
		  </Dialog.Header>
	  
		  <!-- Include the GoalForm component here -->
		  <GoalForm data={{ form: data.form }} on:success={() => dialogOpen = false} />
		</Dialog.Content>
	  </Dialog.Root>

  <DataTable data={data.goals} {columns} />
</div>
