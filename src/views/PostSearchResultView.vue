<template>
    

    <div class="post-view">

        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="post-view-inner">
                        <h2>Keyword: {{ keyword }}</h2>

                        <template v-if="postsError">
                            <p>文章資料載入失敗!</p>
                        </template>
                        <template v-else-if="postsData">

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
                                :preUrl="`/post/search/${keyword}`"
                            />

                        </template>
                        <template v-else>
                            <p>Loading...</p>
                        </template>

                    </div>
                </div>
            </div>
        </div>

    </div>

    

</template>

<script setup>
import { ref, onMounted, watchEffect, computed } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

// components
import PostList from '@/components/PostList.vue';
import ListPagination from '@/components/ListPagination.vue';


const route = useRoute();  // 路由

const keyword = ref(route.params.keyword); // 路由參數 keyword
const currentPage = ref(+route.params.page); // 目前頁碼 (路由參數 page (從1開始))

const postsCountOfPage = ref(15);  // 一頁顯示幾篇文章 (API request)

// 文章資料 起始索引 (從0開始) (API request)
const currentStartIndex = computed(()=>{
    return (currentPage.value - 1) * postsCountOfPage.value;
})

// const loadingStatus = ref(false); // 載入狀態
const postsData = ref(null);   // 文章資料 (API response)
const postsCount = ref(null);  // 文章總數 (API response)
const postsError = ref(null);   // 文章資料 (API response) Error


// 監視 路由參數
watchEffect(()=>{
    keyword.value = route.params.keyword;
    currentPage.value = +route.params.page;

    getPostsData();  // 取得資料
})


function getPostsData() {
    axios({
        method: 'get',
        url: `https://dummyjson.com/posts/search?q=${keyword.value}&limit=${postsCountOfPage.value}&skip=${currentStartIndex.value}`,
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




onMounted(()=>{

    getPostsData();
})



</script>