<template>
    

    <div class="login">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="login-inner">
                        <h3>Login</h3>

                        <fieldset>
                            <label for="user-account">帳號</label>
                            <input type="text" v-model="data.userAccount">
                        </fieldset>

                        <fieldset>
                            <label for="user-account">密碼</label>
                            <input type="password" v-model="data.userPassword">
                        </fieldset>

                        <div v-show="data.isFailure" class="text-danger">登入失敗！帳號或密碼錯誤</div>
                        <div v-show="data.isLoading" class="text-info">登入中...請稍後!</div>
                        
                        <button @click="submit">Login</button>


                    </div>
                </div>
            </div>
        </div>
    </div>
    

</template>
<script>
import { reactive } from 'vue';
import { useLoginStore } from '@/stores/login';
import { useRouter } from "vue-router";

export default {
    name: 'TheLogin',
    setup() {

        const store = useLoginStore();  // Store
        const router = useRouter(); // 路由

        let data = reactive({
            userAccount: 'emilys',
            userPassword: 'emilyspass',
            isFailure: false,
            isLoading: false,
        })

        // 登入
        function submit() {
            data.isLoading = true;

            // 使用 username + password 取得 token
            fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    
                    username: data.userAccount,
                    password: data.userPassword,
                    expiresInMins: 2, // optional, defaults to 60
                })
            })
            .then(res => {
                console.log(res.status); // Will show you the status
                if (!res.ok) {
                    // throw new Error("HTTP status " + res.status);
                    data.isFailure = true;
                    console.log('登入失敗');
                }
                return res.json();
            })
            .then(json => {
                console.log(json);

                // 把資料存入 store
                store.user_name = `${json.firstName} ${json.lastName}`;

                // 將登入資料存入 session
                sessionStorage.setItem("refreshToken", json.refreshToken);
                sessionStorage.setItem("token", json.token);

                console.log('目前登入者為', store.user_name);
                alert('登入成功');
                console.log('登入成功');

                // 跳轉至主頁
                router.push('/admin/home/');
            });
        }



        return {
            data,

            submit,
        }
    }
}
</script>