<script lang="ts">
    import Profile from '$lib/components/icons/profile.svelte';
    import Logo from '$lib/components/icons/logo.svelte';
</script>
<nav class="container grid grid-cols-12 items-center pt-[20px] pb-[50px] justify-center">
    <div class="col-span-3 flex justify-start">
        <a href="/"><Logo /></a>
    </div>
    <div class="col-span-6 flex justify-center">
        <div class="bg-white rounded-24 transition flex duration-150 w-fit gap-[20px] py-[10px] px-[30px]">
            <a href="/" class="underline-link text-[16px] text-link-primary font-bold">Dashboard</a>
            <a href="/changes" class="underline-link text-[16px] text-link-primary font-bold">Zmeny</a>
            <a href="/goals" class="underline-link text-[16px] text-link-primary font-bold">Ciele</a>
        </div>
    </div>
    <div class="col-span-3 flex justify-end">
        <Profile />
    </div>
</nav>
