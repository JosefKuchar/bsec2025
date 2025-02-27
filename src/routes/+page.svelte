<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { PieChart, Text } from 'layerchart';
	import { schemeTableau10 } from 'd3-scale-chromatic';
	import { Progress } from '$lib/components/ui/progress';

	export let data: any;

	const dataOld = [
		{
			year: 2019,
			basket: 1,
			fruit: 'apples',
			value: 3840
		},
		{
			year: 2019,
			basket: 1,
			fruit: 'bananas',
			value: 1920
		},
		{
			year: 2019,
			basket: 2,
			fruit: 'cherries',
			value: 960
		},
		{
			year: 2019,
			basket: 2,
			fruit: 'grapes',
			value: 400
		}
	];

	console.log(data);
</script>

<div class="container">
	<div class="grid grid-cols-3 gap-4">
		<Card>
			<CardHeader>
				<CardTitle>Aktuální stav</CardTitle>
			</CardHeader>
			<CardContent>
				<div class="h-[300px] resize overflow-auto rounded border p-4">
					<PieChart
						data={dataOld}
						cRange={schemeTableau10}
						key="fruit"
						value="value"
						innerRadius={-20}
						cornerRadius={5}
						padAngle={0.02}
					>
						<svelte:fragment slot="aboveMarks">
							<Text
								value="10 000 Kč"
								textAnchor="middle"
								verticalAnchor="middle"
								class="text-4xl"
								dy={4}
							/>
							<Text
								value="Celkový stav účtu"
								textAnchor="middle"
								verticalAnchor="middle"
								class="fill-surface-content/50 text-sm"
								dy={26}
							/>
						</svelte:fragment>
					</PieChart>
				</div>
			</CardContent>
		</Card>
		<Card class="col-span-2">
			<CardHeader>
				<CardTitle>Cíle aktuálně</CardTitle>
			</CardHeader>
			<CardContent>
				{#each data.goals as goal}
					<div class="font-bold">{goal.name}</div>
					<div>{goal.description}</div>
					<Progress value={50} max={100} />
				{/each}
			</CardContent>
		</Card>
		<Card class="col-span-3">
			<CardHeader>
				<CardTitle>Cíle dlouhodobě</CardTitle>
			</CardHeader>
			<CardContent>
				<table class="table-auto">
					<thead>
						<tr>
							<th></th>
							<th colspan="3">2024</th>
						</tr>
						<tr>
							<th>Cíl</th>
							<th>1</th>
							<th>2</th>
							<th>3</th>
						</tr>
					</thead>
					<tbody>
						<tr class="table-row">
							<td><div class="mr-5">Nejaky goal</div></td>
							<td>
								<div class="m-[2px] h-7 w-7 rounded bg-green-500"></div>
							</td>
							<td>
								<div class="m-[2px] h-7 w-7 rounded bg-gray-500"></div>
							</td>
							<td>
								<div class="m-[2px] h-7 w-7 rounded bg-green-500"></div>
							</td>
						</tr>
						<tr class="table-row">
							<td><div class="mr-5">Nejaky goal bracho</div></td>
							<td>
								<div class="m-[2px] h-7 w-7 rounded bg-green-500"></div>
							</td>
							<td>
								<div class="m-[2px] h-7 w-7 rounded bg-green-500"></div>
							</td>
							<td>
								<div class="m-[2px] h-7 w-7 rounded bg-green-500"></div>
							</td>
						</tr>
					</tbody>
				</table>
			</CardContent>
		</Card>
	</div>
</div>
