<template>

    <div class="post-wrap">
        <div class="container">
            <div class="row">
                <div class="col-12 col-md-9">
                    <!-- 麵包屑: 不會做 -->
                    <!-- <PostBreadcrumb /> -->

                    <!-- 根據路由決定顯示的組件 -->
                    <!-- <router-view></router-view> -->

                    <!-- 帶有過渡動畫的路由組件 -->
                    <TransitionRouterView />


                </div>
                <div class="col-12 col-md-3">
                    <!-- 側邊欄 -->
                    <PostSideNav />
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

// components
import PostSideNav from '@/components/PostSideNav.vue';
import PostBreadcrumb from '@/components/PostBreadcrumb.vue';
import TransitionRouterView from '@/layouts/TransitionRouterView.vue';

// import { useRoute } from 'vue-router';

// const route = useRoute();


</script>