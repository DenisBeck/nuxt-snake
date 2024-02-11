<script setup>
defineProps({
    text: String | Number
})
</script>

<template>
    <p class="text">{{ $t(text) }}</p>
</template>

<style scoped>

</style>