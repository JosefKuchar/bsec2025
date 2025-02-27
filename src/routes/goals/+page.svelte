<script lang="ts">
  import DataTable from "./data-table.svelte";
  import { columns } from "./columns.js";
  import type { PageData } from "../$types";
  import { Button } from "$lib/components/ui/button";
  import GoalForm from "./goal-form.svelte";
  import { fade } from "svelte/transition";
  
  export let data: PageData;
  
  let showForm = false;
  
  function toggleForm() {
    showForm = !showForm;
  }
  
  function handleSubmit() {
    toggleForm();
    // Add any additional submission logic here
  }
</script>

<div class="space-y-4">
  <Button variant="outline" class="mb-6 ml-auto" on:click={toggleForm}>Add Goal</Button>
  
  {#if showForm}
    <div transition:fade class="p-6 border rounded-lg bg-background">
      <GoalForm
        formData={data.form}
        title="Create New Goal"
        description="Set up a new tracking goal for your financial targets"
        submitText="Create Goal"
        on:submit={handleSubmit}
      />
    </div>
  {/if}

  <DataTable data={data.goals} {columns} />
</div>
