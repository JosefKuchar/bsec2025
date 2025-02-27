<script lang="ts">
	import Profile from '$lib/components/icons/profile.svelte';
	import Logo from '$lib/components/icons/logo.svelte';
</script>

<nav class="container grid grid-cols-12 items-center justify-center pt-[20px] pb-[50px]">
	<div class="col-span-3 flex justify-start">
		<a href="/"><Logo /></a>
	</div>
	<div class="col-span-6 flex justify-center">
		<div
			class="rounded-24 flex w-fit gap-[20px] bg-white px-[30px] py-[10px] transition duration-150"
		>
			<a href="/" class="underline-link text-link-primary text-[16px] font-bold">🧐 Přehled</a>
			<a href="/changes" class="underline-link text-link-primary text-[16px] font-bold">🏃‍♂️ Pohyby</a
			>
			<a href="/goals" class="underline-link text-link-primary text-[16px] font-bold">✨ Cíle</a>
		</div>
	</div>
	<div class="col-span-3 flex justify-end">
		<Profile />
	</div>
</nav>
