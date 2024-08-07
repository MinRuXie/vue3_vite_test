<template>

    <div class="admin-wrap">
        <!-- 根據路由決定顯示的組件 -->
        <!-- <router-view></router-view> -->

        <!-- 帶有過渡動畫的路由組件 -->
        <TransitionRouterView />
    </div>

</template>

<script setup>
import TransitionRouterView from '@/layouts/TransitionRouterView.vue';
</script>