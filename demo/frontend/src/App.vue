<template>
  
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <router-link to="/">ROOT</router-link>|
    <router-link to="/register">JOIN</router-link> -->

    <Home />

  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import Home from './components/Home.vue';

@Options({
  components: {
    HelloWorld,
    Home,
  },
})
export default class App extends Vue {}
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
