<template>
    <h3>用戶主頁</h3>
    <p>Hello, {{ store.user_name }}!</p>

    <button @click="store.logOut">登出</button>
</template>
<script>
import { useLoginStore } from '@/stores/login';
// import { useRouter } from "vue-router";

export default {
    name: 'TheHome',
    setup() {

        const store = useLoginStore();  // Store
        // const router = useRouter(); // 路由



        


        return {
            store,
        }
    }
}
</script>