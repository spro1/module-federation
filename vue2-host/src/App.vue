<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <Com />
    <div id="vue3-option"></div>
    <div id="vue3-composition"></div>
    <div id="vue3"></div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Com from 'remote2vue/TestCom'
import TestOptionJS from 'remote3vue/TestOptionJS'
import TestCompositionJS from 'remote3vue/TestCompositionJS'
import TestOption from 'remote3vue/TestOption'
import convertVue2 from './library/convertVue2'
export default {
  name: 'App',
  components: {
    HelloWorld,
    Com,
  },
  mounted() {
    TestOptionJS('#vue3-option');
    TestCompositionJS('#vue3-composition');
    convertVue2(TestOption,'#vue3');
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
