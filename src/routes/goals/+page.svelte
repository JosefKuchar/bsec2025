<script lang="ts">
	import DataTable from "./data-table.svelte";
	import { columns } from "./columns.js";
	import type { PageData } from "../$types";
	import { Button } from "$lib/components/ui/button";
	
	export let data: PageData;
	console.log(data);
</script>
	
<div class="space-y-4">
	<Button variant="outline" class="mb-6 ml-auto">Add Goal</Button>
	<DataTable data={data.goals} {columns} />
</div>
