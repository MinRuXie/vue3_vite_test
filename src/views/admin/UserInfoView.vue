<template>

    <div class="user-info">

        <section>
            <header class="section-header">
                <h4>我的帳號</h4>
                <router-link to="/admin/home/account-modify" class="btn btn-primary">修改資訊</router-link>
            </header>
            
            <div class="card">
                <div class="card-body">

                    <img :src="userStore.userImage" alt="avator" width="100">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <div class="fw-bold">name</div>{{ userStore.userFullName }}
                        </li>
                        <li class="list-group-item">
                            <div class="fw-bold">gender</div>{{ userStore.userGender }}
                        </li>
                        <li class="list-group-item">
                            <div class="fw-bold">email</div>{{ userStore.userEmail }}
                        </li>
                    </ul>

                </div>
            </div>
        </section>

        <section>
            <header class="section-header">
                <h4>我的文章</h4>
                
            </header>
            
            <div class="card">
                <div class="card-body">

                    <template v-if="postsError">
                        <p>文章資料載入失敗!</p>
                    </template>
                    <template v-else-if="postsData">
                        
                        <p v-if="postsData.length<=0">沒有文章資料</p>
                        <template v-else>
                            <span>共{{ postsData.total }}篇</span>
                            <ul class="list-group list-group-flush">
                                <li v-for="(item, index) of postsData.posts" :key="index" class="list-group-item">
                                    <router-link :to="`/post/detail/${item.id}`">{{ item.title }}</router-link>
                                    瀏覽:{{ item.views }}次 / 喜歡:{{ item.reactions.likes }}人 / 不喜歡: {{ item.reactions.dislikes }}人
                                </li>
                            </ul>
                        </template>
                        
                    </template>
                    <template v-else>
                        <p>Loading...</p>
                    </template>

                </div>
            </div>
        </section>
        

        <!-- userData: <pre>{{ userData }}</pre> -->

    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';

// stores
import { useUserStore } from '@/stores/user';

import axios from 'axios';


const userStore = useUserStore();  // Store

// Vue 3 - Fetch Data from an API
// https://jasonwatmore.com/vue-3-fetch-data-from-an-api

const postsData = ref(null);   // API資料是非同步回傳, 必須用響應式接住
const postsError = ref(null);  // 載入失敗


function getPostsData() {
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
        postsError.value = error;
    });
}


onMounted(()=>{

    getPostsData();
})
</script>