<template>

    <div class="post-view">

        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="post-view-inner">

                        <template v-if="!loadingStatus">
                            載入文章列表中...
                        </template>
                        <template v-if="loadingStatus">
                            <p>
                                目前為第 {{ currentPage }} 頁, 顯示第 {{ currentStartIndex + 1 }} - {{ currentStartIndex + 10 }} 篇, 共 {{ postsCount }} 篇文章
                            </p>
                            
                            <!-- posts list -->
                            <ol class="list-group list-group-numbered">
                                <li v-for="(post, postIndex) in postsData" :key="postIndex"
                                    class="list-group-item d-flex justify-content-between align-items-start">
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">
                                            <router-link :to="`/post-detail/${post.id}`">{{ post.title }}</router-link>
                                        </div>
                                    </div>
                                    <div class="tags-wrap">
                                        <span v-for="(tag, tagIndex) in post.tags" :key="tagIndex" 
                                            class="badge text-bg-primary rounded-pill">{{ tag }}</span>
                                    </div>
                                </li>
                            </ol>

                            <!-- paginative -->
                            <PostPagination
                                :postsCount="postsCount"
                                :postsCountOfPage="postsCountOfPage"
                                :currentPage="currentPage"
                            />

                        </template>

                    </div>
                </div>
            </div>
        </div>
        
    </div>

</template>

<script setup>

import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

// components
import PostPagination from './PostPagination.vue';

const route = useRoute();  // 路由

// 元素
const refPavination = ref(null);


// 文章相關
const loadingStatus = ref(false); // 載入狀態
const currentPage = ref(+route.params.page); // 目前頁碼 (路由參數 page (從1開始))
const postsCountOfPage = ref(10);  // 一頁顯示幾篇文章 (API request)

// 文章資料 起始索引 (從0開始) (API request)
const currentStartIndex = computed(()=>{
    return (currentPage.value - 1) * postsCountOfPage.value;
})
// page 1: 0~9
// page 2: 10~19
// page 3: 20~29
// 依此類推...

const postsData = ref(null);   // 文章資料 (API response)
const postsCount = ref(null);  // 文章總數 (API response)



// 監視 路由參數 page
watch(
  () => route.params.page,
  (newValue, oldValue) => {
    // react to route changes...
    currentPage.value = +newValue;

    getPostsData();  // 取得資料
  }
)





// 取得資料
function getPostsData() {
    axios({
        method: 'get', // put(替換資源)、patch(更換資源部分內容)
        url: `https://dummyjson.com/posts?limit=${postsCountOfPage.value}&skip=${currentStartIndex.value}`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;

        postsData.value = data.posts;
        postsCount.value = +data.total;
        loadingStatus.value = true;
    })
    .catch(function (error) {
        console.log('取得失敗', error);
        alert('取得失敗');
    });
}




onMounted(()=>{
    console.log('onMounted');

    getPostsData();  // 取得資料
})



</script> 