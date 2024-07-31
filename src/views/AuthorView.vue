<template>

    <div class="author-view">
        <h2>All Authors</h2>

        <div class="author-list">
        
            <template v-if="userDataLoading">
                作者資料載入中...
            </template>
            <template v-if="!userDataLoading">

                <!-- author list -->
                <AuthorList 
                    :userData="userData"
                />

                <!-- pagination -->
                <ListPagination
                    :dataCount="userCount"
                    :dataCountOfPage="userCountOfPage"
                    :currentPage="currentPage"
                    :currentStartIndex="currentStartIndex"
                    :preUrl="'/author/list'"
                />

            </template>

        </div>
                
    </div>

</template>
<script setup>

import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

// components
import AuthorList from '@/components/AuthorList.vue';
import ListPagination from '@/components/ListPagination.vue';

const route = useRoute();  // 路由


const userDataLoading = ref(true);  // 使用者資料載入狀態
const currentPage = ref(+route.params.page); // 目前頁碼 (路由參數 page (從1開始))
const userCountOfPage = ref(8);  // 一頁顯示幾位作者 (API request)

// 使用者資料 起始索引 (從0開始) (API request)
const currentStartIndex = computed(()=>{
    return (currentPage.value - 1) * userCountOfPage.value;
})

const userData = ref(null);   // 使用者資料 (API response)
const userCount = ref(null);  // 使用者數量 (API response)



// 取得 使用者資料
async function getUserData() {
    return axios({
        method: 'get',
        url: `https://dummyjson.com/users?limit=${userCountOfPage.value}&skip=${currentStartIndex.value}`,
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

// 取得 特定使用者的文章資料
async function getPostsOfUser(user) {
    return axios({
        method: 'get',
        url: `https://dummyjson.com/users/${user.id}/posts`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;
        
        // 將文章資料塞入對應的作者中
        user['customPosts'] = data.posts;
        user['customPostsLoading'] = false;
    })
    .catch(function (error) {
        console.log('取得失敗', error);

    });
}

// 取得資料的流程控制
async function getData() {
    await getUserData();

    console.log('***', userData.value);

    // 遍歷使用者
    userData.value.forEach(user => {
        user['customPostsLoading'] = true;
        getPostsOfUser(user);
    });
}


// 監視 路由參數 page
watch(
  () => route.params.page,
  (newValue, oldValue) => {
    // react to route changes...
    currentPage.value = +newValue;

    getData();
  }
)

onMounted(async ()=>{
    getData()
})

</script>