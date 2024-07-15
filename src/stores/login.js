import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from "vue-router";


export const useLoginStore = defineStore('login', () => {
    const router = useRouter(); // 路由
    
    const user_name = ref('');


    function logOut() {
        // 將登入資料從 session 清除
        sessionStorage.clear();

        // 跳轉至登入頁
        router.push('/admin/login/');
    }


    return {
        user_name,

        logOut,
    }
})
