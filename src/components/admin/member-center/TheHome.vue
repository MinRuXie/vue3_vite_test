<template>

    <!-- Nav -->
    <TheNavigation />

    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="admin-home">
                    <h3>主頁</h3>
                    

                    <!-- 根據路由決定顯示的組件 -->
                    <router-view
                        :data="data"
                    ></router-view>

                    <button @click="modifyUserInfo">修改姓名</button>

                    <!-- <router-link to="/admin/home/account" class="btn btn-primary">展示資訊</router-link>
                    <router-link to="/admin/home/account-modify" class="btn btn-primary">修改資訊</router-link> -->
                </div>
            </div>
        </div>
    </div>

    

    
</template>
<script>
import { reactive, onMounted } from 'vue';

// stores
import { useLoginStore } from '@/stores/login';

// components
import TheNavigation from './TheNavigation.vue';


export default {
    name: 'TheHome',
    components: {
        TheNavigation,
    },

    setup() {

        const store = useLoginStore();  // Store
        
        // 資料

        // Vue 3 - Fetch Data from an API
        // https://jasonwatmore.com/vue-3-fetch-data-from-an-api
        // let userData = ref(null); // API資料是非同步回傳, 必須用響應式接住
        // let userData = reactive({
        //     data: null
        // });

        let data = reactive({
            userData: null,
            postsData: null,
        })

        // 取得資料
        async function getData() {
            // 使用 token 取得登入者資訊
            /* providing token in bearer */
            await fetch('https://dummyjson.com/auth/me', {
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
                data.userData = structuredClone(json);
            });


            // 使用 id 取得文章列表
            /* getting posts of user with id 5 */
            fetch(`https://dummyjson.com/users/${data.userData.id}/posts`)
            .then(res => res.json())
            .then(json => {
                console.log('json', json);

                data.postsData = structuredClone(json);
            });
        }


        // 修改使用者資料
        function modifyUserInfo() {

            /* updating lastName of user with id 2 */
            fetch(`https://dummyjson.com/users/${data.userData.id}`, {
                method: 'PUT', /* or PATCH */
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    lastName: 'Owais'
                })
            })
            .then(res => {

                if (!res.ok) {
                    alert('儲存失敗');
                }
                
                return res.json();
            })
            .then(json=>{
                console.log('儲存資料', json);

                // 將回傳資料更新到元件資料
                data.userData.lastName = json.lastName;
                
                // 將回傳資料更新到 stores
                store.user_name = `${data.userData.firstName} ${data.userData.lastName}`;
            });
        }


        onMounted(()=>{
            // init
            getData();
        })



        return {
            store,
            data,

            modifyUserInfo,
        }
    }
}
</script>