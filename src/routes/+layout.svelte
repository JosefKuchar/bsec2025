<script lang="ts">
	import Header from '$lib/components/layout/header.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<section class="page-bg h-full">
	<Header />
	{@render children()}
</section>
