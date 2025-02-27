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

<div class="container space-y-4">
	<Card>
		<CardHeader>
			<CardTitle>Cíle</CardTitle>
		</CardHeader>
		<CardContent>
			<Dialog.Root>
				<Dialog.Trigger
					class="focus:ring-opacity-50 mb-5 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
				>
					+ Nový cíl
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
		</CardContent>
	</Card>
</div>
