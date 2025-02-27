<script lang="ts">
	import DataTable from "./data-table.svelte";
	import { columns } from "./columns.js";
	import type { PageData } from "./$types";
	import * as Dialog from "$lib/components/ui/dialog/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import GoalForm from "./goal-form.svelte";
	import { enhance } from "$app/forms";
  
	export let data: PageData;
  </script>
  
  <div class="pb-[40px] space-y-4 container">
	<Dialog.Root>
		<Dialog.Trigger>
		  <Button>+ New Goal</Button>
		</Dialog.Trigger>
		<Dialog.Content>
		  <Dialog.Header>
			<Dialog.Title class="text-xl font-bold">New Goal</Dialog.Title>
			<Dialog.Description class="text-gray-500">
			  Create a new goal to track your progress. Fill out the form below to get started.
			</Dialog.Description>
		  </Dialog.Header>
	  
		  <!-- Include the GoalForm component here -->
		  <GoalForm data={{ form: data.form }} />
		</Dialog.Content>
	  </Dialog.Root>
  
	<DataTable data={data.goals} {columns} />
  </div>
