<nav class="container flex justify-center pt-[20px]">
    <div class="bg-white rounded-24 transition duration-150 flex w-fit gap-[20px] py-[10px] px-[30px]">
        <a href="/changes" class="link text-[16px] text-link-primary font-bold">Zmeny</a>
        <a href="/goals" class="link text-[16px] text-link-primary font-bold">Ciele</a>
    </div>
</nav>

<style>
    .link {
        position: relative;
    }

    .link::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0;
        height: 2px;
        background-color: #007BFF;
        transition: width 0.3s ease;
    }

    .link:hover::after {
        width: 100%;
    }
</style>