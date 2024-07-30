<template>

    <nav class="main-nav">

        <div class="nav-inner">
            <h1 class="nav-title">
                <router-link to="/">DummyJSON 練習</router-link>
            </h1>

            

            <div class="user-info">

                <template v-if="userStore.isLogin">
                    <span>Hello, <router-link to="/admin/home">{{ userStore.userFullName }}</router-link>!</span>
                    
                    <button @click="userStore.logOut" class="btn btn-primary">登出</button>
                </template>

                <template v-if="!userStore.isLogin">
                    <span>歡迎光臨</span>
                    <router-link to="/admin/login" class="btn btn-primary">登入</router-link>
                </template>

            </div>

        </div>
        
    </nav>

</template>

<script setup>
import { useUserStore } from '@/stores/user';




const userStore = useUserStore();  // Store


        
</script>