<template>

    <div class="post-view">
        <h2>Archive Result: {{ currentTag }}</h2>

        <template v-if="!loadingStatus">
            載入文章列表中...
        </template>
        <template v-if="loadingStatus">
        
            <!-- posts list -->
            <PostList 
                :postsData="postsData"
            />
            
            <!-- paginative -->
            <ListPagination
                :dataCount="postsCount"
                :dataCountOfPage="postsCountOfPage"
                :currentPage="currentPage"
                :currentStartIndex="currentStartIndex"
                :preUrl="`/post/category/${currentTag}`"
            />


        </template>
    </div>

</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import axios from 'axios';

import { useRoute } from 'vue-router';

// components
import PostList from '@/components/PostList.vue';
import ListPagination from '@/components/ListPagination.vue';




const route = useRoute();  // 路由


const currentTag = ref(route.params.tag); // 目前標籤 (路由參數 tag)
const currentPage = ref(+route.params.page); // 目前頁碼 (路由參數 page (從1開始))

const loadingStatus = ref(false); // 載入狀態
const postsCountOfPage = ref(15);  // 一頁顯示幾篇文章 (API request)

// 文章資料 起始索引 (從0開始) (API request)
const currentStartIndex = computed(()=>{
    return (currentPage.value - 1) * postsCountOfPage.value;
})

const postsData = ref(null);   // 文章資料 (API response)
const postsCount = ref(null);  // 文章總數 (API response)


// 監視 路由參數 tag
watch(
    () => route.params.tag,
    (newValue, oldValue) => {
        // react to route changes...
        currentTag.value = newValue;

        getPostsOfTag();  // 取得資料
    }
)


// 監視 路由參數 page
watch(
    () => route.params.page,
    (newValue, oldValue) => {
        // react to route changes...
        currentPage.value = +newValue;

        getPostsOfTag();  // 取得資料
    }
)


// "https://dummyjson.com/posts/tag/history"


// 取得 指定標籤的文章
function getPostsOfTag() {
    axios({
        method: 'get',
        url: `https://dummyjson.com/posts/tag/${currentTag.value}?limit=${postsCountOfPage.value}&skip=${currentStartIndex.value}`
    })
    .then(function (response) {
        console.log('分類文章 取得成功', response);
        const data = response.data;

        postsData.value = data.posts;
        postsCount.value = +data.total;
        loadingStatus.value = true;
    })
    .catch(function (error) {
        console.log('分類文章 取得失敗', error);
        alert('分類文章 取得失敗');
    });
}


onMounted(()=>{

    getPostsOfTag();
})



</script>