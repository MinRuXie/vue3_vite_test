<template>

    <div class="author-wrap">

        <div class="container">
            <div class="row">
                <div class="col-12">

                    <!-- 根據路由決定顯示的組件 -->
                    <!-- <router-view></router-view> -->

                    <!-- 帶有過渡動畫的路由組件 -->
                    <TransitionRouterView />
                </div>
            </div>
        </div>

    </div>

</template>

<script setup>
import TransitionRouterView from '@/layouts/TransitionRouterView.vue';




</script>