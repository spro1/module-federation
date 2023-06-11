<template>
    <button @click="inc">vue2 remote button</button>
</template>
<script>
export default {
    methods: {
        inc() {
            alert('vue2 remote component')
        }
    }
}
</script>