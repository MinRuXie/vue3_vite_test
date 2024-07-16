import { ref } from 'vue';
import { defineStore } from 'pinia';
import { useRouter } from "vue-router";


export const useLoginStore = defineStore('login', () => {
    const router = useRouter(); // 路由
    
    // 資料
    const user_name = ref('');  // 使用者名稱


    function logOut() {
        console.log('登出成功');

        // 將登入資料從 session 清除
        sessionStorage.clear();

        // 跳轉至登入頁
        router.push('/admin/login/');

        alert('登出成功');
    }


    return {
        user_name,

        logOut,
    }
})
