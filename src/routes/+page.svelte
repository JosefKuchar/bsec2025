<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { Card, CardContent, CardHeader, CardTitle } from '$lib/components/ui/card';
	import { PieChart, Text } from 'layerchart';
	import { schemeTableau10 } from 'd3-scale-chromatic';
	import { Progress } from '$lib/components/ui/progress';
	import { Wheel } from 'spin-wheel';
	import { onMount } from 'svelte';
	import { Dialog, DialogContent } from '$lib/components/ui/dialog';

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

	const months = data.months;
	const goalsLongterm = data.goals.map((goal) => {
		let data = [];
		for (let i = 0; i < 12; i++) {
			let cat = months[i].categories.find((category: { id: number }) => category.id === goal.changeTypeId);
			if (cat) {
				if (cat.amount > goal.value) {
					data.push(true);
				} else {
					data.push(false);
				}
			} else {
				data.push(false);
			}
		}

		// Calculate max streak
		let streak = 0;
		let maxStreak = 0;
		for (let i = 0; i < data.length; i++) {
			if (data[i]) {
				streak++;
				if (streak > maxStreak) {
					maxStreak = streak;
				}
			} else {
				streak = 0;
			}
		}

		const color = streakToColor(maxStreak);

		return {
			name: goal.name,
			streak: maxStreak,
			color,
			data
		};
	});
	let wheel = null;
	onMount(() => {
		const props = {
			items: [
				{ label: 'Dárkový poukaz 500 Kč' },
				{ label: 'Sleva 20 % na další nákup' },
				{ label: 'Zdarma doprava' },
				{ label: 'Hrnek s logem' },
				{ label: 'Bonusové body do věrnostního programu' },
				{ label: 'Tajemná krabička s překvapením' },
				{ label: 'Tričko s potiskem' },
				{ label: 'Sleva 50 % na vybraný produkt' }
			],
			radius: 1
		};

		// 2. Decide where you want it to go:
		const container = document.querySelector('.wheel-container');

		// 3. Create the wheel in the container and initialise it with the props:
		wheel = new Wheel(container, props);

		wheel.isInteractive = false;
		wheel.spinToItem(0, 4000);
	});

	const spinWheel = () => {
		wheel.spinToItem(1, 4000, true, 10);
	};

	console.log(data.months[2]);
	
	function calculateGoalProgress(goal) {
		console.log(goal);

		const currentMonth = new Date().getMonth();
		
		// get goal value
		const goalValue = goal.value;

		console.log(data.months[currentMonth]);

		if (data.balance <= 0) {
			return 0;
		}

		if (goal.type == 1) {
			const goalAmount = goalValue * data.months[currentMonth].positiveAmount;
			console.log(data.balance / goalAmount);
			return data.balance / goalAmount;
		}

		if (data.balance >= goalValue) {
			return 100;
		}

		return (data.balance / goalValue) * 100;
	}

	let spinnedToday = false;
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
								value={new Intl.NumberFormat('cs-CZ', {
									style: 'currency',
									currency: 'CZK'
								}).format(data.balance)}
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
					<Progress value={calculateGoalProgress(goal)} max={100} />
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


		<Dialog open={true}>
		<DialogContent>
			<div class="wheel-container h-[600px] w-[600px]" onclick={spinWheel}></div>
		</DialogContent>
		</Dialog>
	</div>
</div>
