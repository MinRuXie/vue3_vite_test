<template>

    <nav class="admin-nav">

        <div class="nav-inner">
            <h1 class="nav-title">會員中心</h1>

            <div class="user-info">
                <span>Hello, {{ userStore.userFullName }}!</span>
                <button @click="userStore.logOut" class="btn btn-primary">登出</button>
            </div>
        </div>
        
    </nav>

</template>

<script setup>
import { useUserStore } from '@/stores/user';


const userStore = useUserStore();  // Store


        
</script>