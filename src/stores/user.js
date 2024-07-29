import { defineStore } from 'pinia';
import { useRouter } from "vue-router";
import { ref, computed } from 'vue';
import axios from 'axios';


// 創建一個 Store, 使用 Setup 函数定義
export const useUserStore = defineStore('user', () => {
    const router = useRouter(); // 路由器

    // 資料 (state): data
    const username = ref(null);  // 使用者名稱
    const userId = ref(null);
    const userGender = ref(null);
    const userEmail = ref(null);
    const userImage = ref(null);
    const userFirstName = ref(null);
    const userLastName = ref(null);
    const isLogin = ref(false);

    // 計算屬性 (getter): computed
    const userFullName = computed(()=>{
        return `${userFirstName.value} ${userLastName.value}`;
    })


    // 方法 (action): methods

    // 登入
    function login(formData) {
        console.log(`收到 ${formData.username} 進行登入`);

        // 使用 username + password 取得 token
        // Send a POST request
        axios({
            method: 'post',
            url: 'https://dummyjson.com/auth/login',
            headers: { 'Content-Type': 'application/json' },
            data: {
                username: formData.username,
                password: formData.password,
                expiresInMins: 1, // optional, defaults to 60
            },
        })
        .then(function (response) {
            console.log('登入成功', response);
            const data = response.data;

            // 將 token & refreshToken 存入 sessionStorage
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("refreshToken", data.refreshToken);

            // 將 使用者資料 存入 Pinia Store
            username.value = data.username;
            userId.value = data.id;
            userGender.value = data.gender;
            userEmail.value = data.email;
            userImage.value = data.image;
            userFirstName.value = data.firstName;
            userLastName.value = data.lastName;
            isLogin.value = true;

            alert('登入成功');
            router.push('/admin/home/');  // 跳轉至主頁
        })
        .catch(function (error) {
            console.log('登入失敗', error);
            alert('登入失敗，帳號或密碼錯誤')
        });
    }


    // 登出
    function logOut() {
        console.log('登出成功');

        // 將 store 資料清除
        username.value = null;
        userId.value = null;
        userGender.value = null;
        userEmail.value = null;
        userImage.value = null;
        userFirstName.value = null;
        userLastName.value = null;
        isLogin.value = false;

        // 將登入資料從 session 清除
        sessionStorage.clear();

        // 跳轉至首頁
        // router.push('/');

        // 重整頁面
        location.reload();

        alert('登出成功');
    }


    // 檢查登入狀態
    async function checkLoginStatus() {
        const token = sessionStorage.getItem("token");
        
        // 使用 token 確認登入者身分
        /* providing token in bearer */
        return axios({
            method: 'get',
            url: 'https://dummyjson.com/auth/me',
            headers: {
                'Authorization': `Bearer ${token}`, 
            }, 
        })
        .then(function (response) {
            console.log('使用 token 確認登入者身分 成功 --> 保持登入', response);
            const data = response.data;

            // 將 使用者資料 存入 Pinia Store
            username.value = data.username;
            userId.value = data.id;
            userGender.value = data.gender;
            userEmail.value = data.email;
            userImage.value = data.image;
            userFirstName.value = data.firstName;
            userLastName.value = data.lastName;
            isLogin.value = true;
        })
        .catch(function (error) {
            console.log('使用 token 確認登入者身分 失敗', error);
        });
    }


    return {
        username,
        userId,
        userGender,
        userEmail,
        userImage,
        userFirstName,
        userLastName,
        userFullName,
        isLogin,

        login,
        logOut,
        checkLoginStatus,
    }
})
