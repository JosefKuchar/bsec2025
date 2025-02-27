<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import CardContent from '$lib/components/ui/card/card-content.svelte';
	import CardDescription from '$lib/components/ui/card/card-description.svelte';
	import CardFooter from '$lib/components/ui/card/card-footer.svelte';
	import CardHeader from '$lib/components/ui/card/card-header.svelte';
	import CardTitle from '$lib/components/ui/card/card-title.svelte';
	import Card from '$lib/components/ui/card/card.svelte';
	import { PieChart, Text } from 'layerchart';

	const data = [
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
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>
<Button variant="secondary">Click me</Button>
<Card>
	<CardHeader>
		<CardTitle>Card Title</CardTitle>
		<CardDescription>Card Description</CardDescription>
	</CardHeader>
	<CardContent>
		<p>Card Content</p>
	</CardContent>
	<CardFooter>
		<p>Card Footer</p>
	</CardFooter>
</Card>

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
				<div class="m-[2px] h-7 w-7 rounded bg-green-500"></div>
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

<div class="h-[300px] resize overflow-auto rounded border p-4">
	<PieChart {data} key="fruit" value="value" innerRadius={-20} cornerRadius={5} padAngle={0.02}>
		<svelte:fragment slot="aboveMarks">
			<Text value={123} textAnchor="middle" verticalAnchor="middle" class="text-4xl" dy={4} />
			<Text
				value="total"
				textAnchor="middle"
				verticalAnchor="middle"
				class="fill-surface-content/50 text-sm"
				dy={26}
			/>
		</svelte:fragment>
	</PieChart>
</div>
