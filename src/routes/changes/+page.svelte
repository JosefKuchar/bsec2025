<script lang="ts">
	import DataTable from "./data-table.svelte";
	import Dialog from "./dialog.svelte"
	import { columns } from "./columns.js";
	import type { PageData } from "../$types";
	
	export let data: PageData;
</script>
	
<div class="container">
	<DataTable data={data.changes} {columns} />
  <Dialog />
</div>
