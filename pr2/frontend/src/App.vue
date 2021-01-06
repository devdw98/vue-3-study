<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  <div id="main">
    <div id="nav">
      <router-link to="/">HOME</router-link>  |  
      <router-link to="/posts">POSTS</router-link>  |  
      <router-link to="/posts/write">WRITE</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from './components/HelloWorld.vue';
import Home from './components/UserForm.vue';

@Options({
  components: {
    HelloWorld,
    Home
  },
})
export default class App extends Vue {

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
