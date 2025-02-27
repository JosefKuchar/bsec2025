<script lang="ts">
	import Header from '$lib/components/layout/header.svelte';
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

<section class="page-bg h-screen">
	<Header></Header>
	<div class="container">

	</div>
</section>
