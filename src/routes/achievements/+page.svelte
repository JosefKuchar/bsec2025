<script lang="ts">
    import Achievement from "$lib/components/icons/achievement.svelte";
</script>

<div class="container pb-[40px]">
    <h1 class="text-white pb-[24px]">Achievements</h1>
    <div class="grid grid-cols-12 gap-[24px]">
        <div class="col-span-3 bg-white rounded-24 p-[60px] flex flex-col gap-[12px] items-center">
            <Achievement />
            <h4 class="text-blue">Achievement #1</h4>
        </div>
        <div class="col-span-3 bg-white rounded-24 p-[60px] flex flex-col gap-[12px] items-center">
            <Achievement />
            <h4 class="text-blue">Achievement #2</h4>
        </div>
        <div class="col-span-3 bg-white rounded-24 p-[60px] flex flex-col gap-[12px] items-center">
            <Achievement />
            <h4 class="text-blue">Achievement #3</h4>
        </div>
        <div class="col-span-3 bg-white rounded-24 p-[60px] flex flex-col gap-[12px] items-center">
            <Achievement />
            <h4 class="text-blue">Achievement #4</h4>
        </div>
    </div>
</div>