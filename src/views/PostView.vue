<template>

    <div class="post-view">
        <h2>All Posts</h2>

        <template v-if="postsError">
            <p>文章資料載入失敗!</p>
        </template>
        <template v-else-if="postsData">

            <div class="sort-wrap">
                <span>Sort By:</span>
                <fieldset>
                    <input type="radio" class="btn-check" name="options-sort" id="option5" autocomplete="off" value="asc" v-model="sortOrder" @change="sortPostsData">
                    <label class="btn" for="option5">A-Z</label>
                </fieldset>
                <fieldset>
                    <input type="radio" class="btn-check" name="options-sort" id="option6" autocomplete="off" value="desc" v-model="sortOrder" @change="sortPostsData">
                    <label class="btn" for="option6">Z-A</label>
                </fieldset>
            </div>


            
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
                :preUrl="'/post/list'"
            />

        </template>
        <template v-else>
            <p>Loading...</p>
        </template>

    </div>

</template>

<script setup>

import { ref, computed, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

// components
import PostList from '@/components/PostList.vue';
import ListPagination from '@/components/ListPagination.vue';

const route = useRoute();  // 路由



// 文章相關
// const loadingStatus = ref(false); // 載入狀態
const currentPage = ref(+route.params.page); // 目前頁碼 (路由參數 page (從1開始))
const postsCountOfPage = ref(15);  // 一頁顯示幾篇文章 (API request)

// 文章資料 起始索引 (從0開始) (API request)
const currentStartIndex = computed(()=>{
    return (currentPage.value - 1) * postsCountOfPage.value;
})
// page 1: 0~9
// page 2: 10~19
// page 3: 20~29
// 依此類推...

const sortOrder = ref('asc');

const postsData = ref(null);   // 文章資料 (API response)
const postsCount = ref(null);  // 文章總數 (API response)
const postsError = ref(null);   // 文章資料 (API response) Error


// 監視 路由參數 page
watch(
    () => route.params.page,
    (newValue, oldValue) => {
        // react to route changes...
        currentPage.value = +newValue;

        // 清空原資料
        postsData.value = null;
        postsCount.value = null;
        postsError.value = null;

        getPostsData();  // 取得資料
    }
)


function sortPostsData() {
    // 清空原資料
    postsData.value = null;
    postsCount.value = null;
    postsError.value = null;
    
    getPostsData();  // 取得資料
}


// 取得文章資料
async function getPostsData() {
    return axios({
        method: 'get',
        // url: `https://dummyjson.com/posts?limit=${postsCountOfPage.value}&skip=${currentStartIndex.value}`,
        url: `https://dummyjson.com/posts?limit=${postsCountOfPage.value}&skip=${currentStartIndex.value}&sortBy=title&order=${sortOrder.value}`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;

        postsData.value = data.posts;
        postsCount.value = +data.total;
        // loadingStatus.value = true;
    })
    .catch(function (error) {
        console.log('取得失敗', error);
        // alert('取得失敗');
        postsError.value = error;
    });
}




onMounted(async ()=>{
    // console.log('onMounted');

    await getPostsData();  // 取得資料
})



</script> 