<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->

  <!-- Nav -->
  <AppNav />

  

  <div class="wrapper">
    
    <!-- 根據路由決定顯示的組件 -->
    <!-- <router-view></router-view> -->

    <!-- 帶有過渡動畫的路由組件 -->
    <TransitionRouterView />
  </div>

</template>

<script setup>

// components
import AppNav from '@/components/AppNav.vue';
import TransitionRouterView from '@/layouts/TransitionRouterView.vue';


</script>

<style lang="scss">
  @import './assets/css/style.scss';
</style>