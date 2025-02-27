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

	function streakToColor(streak: number) {
		if (streak < 5) {
			return 'text-black';
		} else if (streak < 10) {
			return 'text-blue-500';
		} else {
			return 'text-yellow-500';
		}
	}

	const years = [2024, 2025].map((year) => {
		return {
			year,
			months: Array(12)
				.fill(0)
				.map((_, i) => i + 1)
		};
	});

	const goalsLongterm = data.goals.map((goal) => {
		const streak = Math.floor(Math.random() * 15);
		const color = streakToColor(streak);

		let data = [];
		for (let i = 0; i < 24; i++) {
			data.push(Math.random() < 0.5);
		}

		return {
			name: goal.name,
			streak,
			color,
			data
		};
	});

	console.log(goalsLongterm);
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
							<th></th>
							{#each years as year}
								<th colspan={year.months.length}><div class="m-1 border-b-2">{year.year}</div></th>
							{/each}
						</tr>
						<tr>
							<th>Cíl</th>
							<th></th>
							{#each years as year}
								{#each year.months as month}
									<th class="font-normal">{month}</th>
								{/each}
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each goalsLongterm as goal}
							<tr class="table-row">
								<td><div class="mr-5">{goal.name}</div></td>
								<td><div class="font-streak mr-2 text-right {goal.color}">x{goal.streak}</div></td>
								{#each goal.data as data}
									<td>
										<div
											class="m-[2px] h-7 w-7 rounded {data ? 'bg-green-500' : 'bg-gray-200'}"
										></div>
									</td>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</CardContent>
		</Card>
	</div>
</div>
