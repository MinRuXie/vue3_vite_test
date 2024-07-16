<template>

    <template v-if="!data.userData">
        載入中...
    </template>
    <template v-if="data.userData">
        <img :src="data.userData.image" alt="avator">
        <h4>帳戶資訊</h4>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">username: {{ data.userData.username }}</li>
            <li class="list-group-item">password: {{ data.userData.password }}</li>
            <li class="list-group-item">name: {{ data.userData.firstName }} {{ data.userData.lastName }}</li>
            <li class="list-group-item">gender: {{ data.userData.gender }}</li>
        </ul>

        <h4>文章</h4><span>共{{ data.postsData.total }}篇</span>
        <ul class="list-group list-group-flush">
            <li v-for="(item, index) of data.postsData.posts" :key="index" class="list-group-item">
                {{ item.title }} --- 瀏覽:{{ item.views }}次 / 喜歡:{{ item.reactions.likes }}人 / 不喜歡: {{ item.reactions.dislikes }}人
            </li>
        </ul>

    </template>

    

    <!-- userData: <pre>{{ userData }}</pre> -->

</template>

<script>
import { reactive, onMounted } from 'vue';

export default {
    name: 'UserInfo',
    setup() {
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

                // userData.value = structuredClone(json);
                // console.log('userData', userData);

                data.userData = structuredClone(json);
                // console.log('data.userData', data.userData);
            });



            // if ( data.userData ) {
                // console.log('data.userData', data.userData);
                // console.log('data.userData.id', data.userData.id);
            // }

            // 使用 id 取得文章列表
            /* getting posts of user with id 5 */
            fetch(`https://dummyjson.com/users/${data.userData.id}/posts`)
            .then(res => res.json())
            .then(json => {
                console.log('json', json);

                data.postsData = structuredClone(json);
            });
        }


        onMounted(()=>{
            // init
            getData();
        })


        
        

        




        return {
            data
        }
    }
}
</script>