<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->

  <!-- Nav -->
  <AppNav />

  

  <div class="wrapper">
    
    <!-- 根據路由決定顯示的組件 -->
    <router-view></router-view>
  </div>

</template>

<script setup>

// components
import AppNav from './components/AppNav.vue';


</script>

<style lang="scss">
  @import './assets/css/style.scss';
</style>