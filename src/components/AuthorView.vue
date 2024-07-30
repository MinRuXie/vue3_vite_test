<template>

    <div class="author-view">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="author-list">
                        <h2>作者</h2>

                        <template v-if="userDataLoading">
                            作者資料載入中...
                        </template>
                        <template v-if="!userDataLoading">
                            共 {{ userCount }} 位作者, 顯示 {{ showCount }} 位
                            <ul class="list-group">
                                <li v-for="(user, index) in userData" :key="index" 
                                    class="list-group-item">
                                    {{ user.username }}<br>

                                    
                                    <template v-if="user.postsLoading">
                                        文章資料載入中...
                                    </template>
                                    <template v-if="!user.postsLoading">
                                        <span v-if="user.posts && user.posts.length <= 0">沒有文章資料</span>
                                        <ul v-if="user.posts && user.posts.length > 0">
                                            <li v-for="(post, postIndex) in user.posts" :key="postIndex">
                                                <router-link :to="`/post/detail/${post.id}`">{{ post.title }}</router-link>
                                            </li>
                                        </ul>
                                    </template>

                                </li>
                            </ul>
                        </template>

                       

                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script setup>

import { ref, onMounted } from 'vue';

import axios from 'axios';

// fetch('https://dummyjson.com/users')
// .then(res => res.json())
// .then(console.log);


const userDataLoading = ref(true);  // 使用者資料載入狀態
const userData = ref(null);   // 使用者資料 (API response)
const userCount = ref(null);  // 使用者數量 (API response)

const currentStartIndex = ref(0);  // 資料起始索引
const showCount = ref(10);

// 'https://dummyjson.com/users?limit=5&skip=10&select=firstName,age'
async function getUserData() {
    return axios({
        method: 'get',
        url: `https://dummyjson.com/users?limit=${showCount.value}&skip=${currentStartIndex.value}`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;
        
        userData.value = data.users;
        userCount.value = data.total;

        userDataLoading.value = false;
    })
    .catch(function (error) {
        console.log('取得失敗', error);

    });
}

async function getPostsOfUser(user) {
    return axios({
        method: 'get',
        url: `https://dummyjson.com/users/${user.id}/posts`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;
        
        // 將文章資料塞入對應的作者中
        user['posts'] = data.posts;
        user['postsLoading'] = false;
    })
    .catch(function (error) {
        console.log('取得失敗', error);

    });
}

onMounted(async ()=>{
    await getUserData();

    console.log('***', userData.value)

    // 遍歷使用者
    userData.value.forEach(user => {
        user['postsLoading'] = true;
        getPostsOfUser(user);
    });
})

</script>