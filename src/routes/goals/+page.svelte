<script lang="ts">
	import DataTable from './data-table.svelte';
	import { columns } from './columns.js';
	import type { PageData } from './$types';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import GoalForm from './goal-form.svelte';
	import { enhance } from '$app/forms';
	import { Card, CardHeader } from '$lib/components/ui/card';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';

	export let data: PageData;
</script>

<div class="container space-y-4 pb-[40px]">
	<Dialog.Root>
		<Dialog.Trigger>
			<Button>+ Nový cíl</Button>
		</Dialog.Trigger>
		<Dialog.Content>
			<Dialog.Header>
				<Dialog.Title class="text-xl font-bold">Nový cíl</Dialog.Title>
			</Dialog.Header>

			<!-- Include the GoalForm component here -->
			<GoalForm data={{ form: data.form }} />
		</Dialog.Content>
	</Dialog.Root>

	<DataTable data={data.goals} {columns} />
</div>
