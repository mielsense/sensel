<script>
    import { Motion } from '$lib/index.js';
</script>

<main class="container">
    <Motion.div
        animate={{ rotate: 90 }}
        transition={{ type: "spring", repeat: Infinity, repeatDelay: 0.2 }}
    >
        <div class="box-container">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
        </div>
    </Motion.div>
</main>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100dvh;
        width: 100dvw;
    }

    .box {
        width: 100px;
        height: 100px;
        background-color: black;
        border-radius: 10px;
    }

    .box-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
    }
</style>
