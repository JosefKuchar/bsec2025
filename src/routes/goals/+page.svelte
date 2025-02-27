<script lang="ts">
	import DataTable from "./data-table.svelte";
	import { columns } from "./columns.js";
	import type { PageData } from "../$types";
	
	export let data: PageData;
	console.log(data);
</script>
	
<DataTable data={data.goals} {columns} />