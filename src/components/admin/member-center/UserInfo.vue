<template>

    <!-- Nav -->
    <UserInfoNav />

    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="admin-home">
                    <h3>主頁</h3>
                    

                    <!-- 根據路由決定顯示的組件 -->
                    <router-view></router-view>

                    <!-- <button @click="modifyUserInfo">修改姓名</button> -->

                    <!-- <router-link to="/admin/home/account" class="btn btn-primary">展示資訊</router-link>
                    <router-link to="/admin/home/account-modify" class="btn btn-primary">修改資訊</router-link> -->
                </div>
            </div>
        </div>
    </div>

</template>


<script setup>
import { reactive, onMounted } from 'vue';

// stores
// import { useUserStore } from '@/stores/user';

// components
import UserInfoNav from './UserInfoNav.vue';



</script>