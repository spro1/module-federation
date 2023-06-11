<script>
import {defineComponent} from 'vue'

export default defineComponent({
  name: "TestOption",
  methods: {
    a(){
      alert("Vue3 OptionAPI component")
    }
  }
})
</script>

<template>
  <button @click="a()">Vue3 remote OptionAPI</button>
</template>

<style scoped>

</style>