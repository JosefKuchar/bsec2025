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

	function sfc32(a, b, c, d) {
		return function () {
			a |= 0;
			b |= 0;
			c |= 0;
			d |= 0;
			let t = (((a + b) | 0) + d) | 0;
			d = (d + 1) | 0;
			a = b ^ (b >>> 9);
			b = (c + (c << 3)) | 0;
			c = (c << 21) | (c >>> 11);
			c = (c + t) | 0;
			return (t >>> 0) / 4294967296;
		};
	}
	const getRand = sfc32(1, 2, 3, 4);

	const months = data.months;
	const goalsLongterm = data.goals.map((goal) => {
		let data = [];
		for (let i = 0; i < 24; i++) {
			data.push(getRand() > 0.3);
			// let cat = months[i].categories.find(
			// 	(category: { id: number }) => category.id === goal.changeTypeId
			// );
			// if (cat) {
			// 	if (cat.amount > goal.value) {
			// 		data.push(true);
			// 	} else {
			// 		data.push(false);
			// 	}
			// } else {
			// 	data.push(false);
			// }
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
	let dialogOpen = false;
	let wheel = null;
	
	const wheelItems = [
		{ label: 'Dárkový poukaz 500 Kč' },
		{ label: 'Sleva 20 % na další nákup' },
		{ label: 'Zdarma doprava' },
		{ label: 'Hrnek s logem' },
		{ label: 'Bonusové body do věrnostního programu' },
		{ label: 'Tajemná krabička s překvapením' },
		{ label: 'Tričko s potiskem' },
		{ label: 'Sleva 50 % na vybraný produkt' }
	];

	function openDialog() {
		dialogOpen = true;
		setTimeout(initWheel, 100);
	}
	
	function handleDialogClose() {
		dialogOpen = false;
		destroyWheel();
	}
	
	function initWheel() {
		const container = document.querySelector('.wheel-container');
		
		if (container) {
			const props = {
				items: wheelItems,
				radius: 1,
				itemLabelColors: ['#fff'],
    itemLabelBaselineOffset: -0.07,
    itemLabelFont: 'Amatic SC',
    itemLabelFontSizeMax: 55,
    itemBackgroundColors: ['#2ac238', '#ffc93c', '#66bfbf', '#a2d5f2', '#515070', '#43658b', '#ed6663', '#d54062' ],
    rotationSpeedMax: 500,
    rotationResistance: -100,
    lineWidth: 1,
    lineColor: '#fff',
			};
			
			wheel = new Wheel(container, props);
			wheel.isInteractive = false;
		}
	}

	function destroyWheel() {
		if (wheel) {
			wheel.destroy();
			wheel = null;
		}
	}

	const spinWheel = () => {
		if (wheel) {
			const randomIndex = Math.floor(Math.random() * wheelItems.length);
			const rotations = 2 + Math.floor(Math.random() * 3);
			wheel.spinToItem(randomIndex, 4000, true, rotations);
		}
	};		

	console.log(data.months[2]);

	function calculateGoalProgress(goal) {
		console.log(goal);

		const currentMonth = new Date().getMonth();

		// get goal value
		const goalValue = goal.value;

		console.log(data.months[currentMonth]);
		console.log(data.balance);

		if (data.balance <= 0) {
			return 0;
		}

		if (goal.type == 0) {
			const goalAmount = goalValue * data.months[currentMonth].positiveAmount;
			console.log(data.balance / goalAmount);
			return data.balance / goalAmount;
		}

		console.log((data.months[currentMonth].netAmount / goalValue) * 100);
		return (data.months[currentMonth].netAmount / goalValue) * 100;
	}

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
								class="text-3xl"
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

		<Button class="w-fit mb-[40px]" onclick={openDialog} onclose={handleDialogClose}>Otevřít kolo štěstí</Button>
		<Dialog bind:open={dialogOpen}>
			<DialogContent>
				<div class="wheel-container h-[450px] w-full"></div>
				<div class="mt-4 flex justify-center">
					<Button onclick={spinWheel}>Roztočit</Button>
				</div>
			</DialogContent>
		</Dialog>
	</div>
</div>
