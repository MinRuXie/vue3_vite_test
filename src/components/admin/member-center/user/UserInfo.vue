<template>

    <section>
        <h4>帳戶資訊</h4>
        <div class="card">
            <div class="card-body">

                <img :src="userStore.userImage" alt="avator" width="100">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">name: {{ userStore.userFullName }}</li>
                    <li class="list-group-item">gender: {{ userStore.userGender }}</li>
                    <li class="list-group-item">emil: {{ userStore.userEmail }}</li>
                </ul>

            </div>
        </div>
    </section>

    <section>
        <h4>撰寫文章</h4>
        <div class="card">
            <div class="card-body">
                
                <template v-if="!postsData">
                    載入中...
                </template>
                <template v-if="postsData">
                    <span>共{{ postsData.total }}篇</span>
                    <ul class="list-group list-group-flush">
                        <li v-for="(item, index) of postsData.posts" :key="index" class="list-group-item">
                            {{ item.title }} --- 瀏覽:{{ item.views }}次 / 喜歡:{{ item.reactions.likes }}人 / 不喜歡: {{ item.reactions.dislikes }}人
                        </li>
                    </ul>
                </template>

            </div>
        </div>
    </section>
    
    <!-- <router-link to="/admin/home/account-modify" class="btn btn-primary">編輯</router-link> -->
        
    <!-- userData: <pre>{{ userData }}</pre> -->

</template>

<script>
import { ref, onMounted } from 'vue';

// stores
import { useUserStore } from '@/stores/user';

import axios from 'axios';

export default {
    name: 'UserInfo',
    setup() {
        const userStore = useUserStore();  // Store

        // Vue 3 - Fetch Data from an API
        // https://jasonwatmore.com/vue-3-fetch-data-from-an-api
        let postsData = ref(null); // API資料是非同步回傳, 必須用響應式接住


        onMounted(()=>{

            /* getting posts of user with id */
            axios({
                method: 'get',
                url: `https://dummyjson.com/users/${userStore.userId}/posts`,
            })
            .then(function (response) {
                console.log('使用 userId 取得文章資料 成功', response);
                const data = response.data;
                postsData.value = structuredClone(data);

                console.log('postsData.value', postsData.value);
            })
            .catch(function (error) {
                console.log('使用 userId 取得文章資料 失敗', error);

            });
        })


        return {
            userStore,
            postsData,

        }
    }
}
</script>