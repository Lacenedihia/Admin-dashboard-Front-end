<template>
    <div class="loader"></div>
</template>

<script>
export default {
    name: "LoaderComponent",
};
</script>

<style scoped>
.loader {
    border: 4px solid #48b4f3;
    border-left-color: transparent;
    width: 30px;
    height: 30px;
    animation: spin89345 1s linear infinite;
    border-radius: 50%;
}

@keyframes spin89345 {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
