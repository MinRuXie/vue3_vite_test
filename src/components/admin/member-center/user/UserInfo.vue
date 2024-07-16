<template>

    <template v-if="!userData">
        載入中...
    </template>
    <template v-if="userData">
        <img :src="userData.image" alt="avator">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">username: {{ userData.username }}</li>
            <li class="list-group-item">password: {{ userData.password }}</li>
            <li class="list-group-item">name: {{ userData.firstName }} {{ userData.lastName }}</li>
            <li class="list-group-item">gender: {{ userData.gender }}</li>
        </ul>
    </template>

    

    <!-- userData: <pre>{{ userData }}</pre> -->

</template>

<script>
import { ref } from 'vue';

export default {
    name: 'UserInfo',
    setup() {
        // 資料
        let userData = ref(null); // API資料是非同步回傳, 必須用響應式接住


        // 使用 token 取得登入者資訊
        /* providing token in bearer */
        fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`, 
            }, 
        })
        .then(res => {
            // console.log(res.status); // Will show you the status
            if (!res.ok) {
                throw new Error("HTTP status " + res.status);
            }
            return res.json();
        })
        .then(json => {
            // console.log(json);

            userData.value = structuredClone(json);
            // console.log('userData', userData);
        });

        // console.log('userData', userData);



        return {
            userData
        }
    }
}
</script>