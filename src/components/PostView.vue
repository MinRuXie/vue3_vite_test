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
                                共 {{ postsCount }} 篇文章, 共 {{ pageCount }} 頁<br>
                                目前為第 {{ currentPage }} 頁, 顯示第 {{ currentStartIndex + 1 }} - {{ currentStartIndex + 10 }} 篇
                            </p>
                            
                            <!-- posts list -->
                            <ol class="list-group list-group-numbered">
                                <li v-for="(post, postIndex) in postsData" :key="postIndex"
                                    class="list-group-item d-flex justify-content-between align-items-start">
                                    <div class="ms-2 me-auto">
                                        <div class="fw-bold">{{ post.title }}</div>
                                        UserID: {{ post.userId }}
                                    </div>
                                    <div class="tags-wrap">
                                        <span v-for="(tag, tagIndex) in post.tags" :key="tagIndex" 
                                            class="badge text-bg-primary rounded-pill">{{ tag }}</span>
                                    </div>
                                </li>
                            </ol>

                            <!-- paginative -->
                            <nav aria-label="Page navigation example" class="pagination-wrap">
                                <ul class="pagination">
                                    <li class="page-item" 
                                        :class="{
                                            'disabled': +currentPage === 1
                                        }">
                                        <router-link :to="`/post/${currentPage-1 >= 1 ? currentPage-1 : 1}`" class="page-link">Previous</router-link>
                                    </li>

                                    <!-- <template v-if="+currentPage === 1"> -->
                                        
                                        <!-- <li v-if="currentPage-1 <= +pageCount" class="page-item">
                                            <router-link :to="`/post/${currentPage-1}`" class="page-link">{{ currentPage-1 }}</router-link>
                                        </li>
                                        <li v-if="currentPage-2 <= +pageCount" class="page-item">
                                            <router-link :to="`/post/${currentPage-2}`" class="page-link">{{ currentPage-2 }}</router-link>
                                        </li> -->
                                        <li class="page-item">
                                            <a class="page-link active" aria-current="page" href="#">{{ currentPage }}</a>
                                        </li>
                                        <!-- <li v-if="currentPage+1 <= +pageCount" class="page-item">
                                            <router-link :to="`/post/${currentPage+1}`" class="page-link">{{ currentPage+1 }}</router-link>
                                        </li>
                                        <li v-if="currentPage+2 <= +pageCount" class="page-item">
                                            <router-link :to="`/post/${currentPage+2}`" class="page-link">{{ currentPage+2 }}</router-link>
                                        </li> -->
                                    <!-- </template>
                                    <template v-else-if="+currentPage === +pageCount">
                                        最後一頁
                                    </template>
                                    <template v-else>
                                        其他頁
                                    </template> -->

                                    <!-- <li class="page-item"><a class="page-link" href="#">1</a></li>
                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                    <li class="page-item"><a class="page-link" href="#">3</a></li> -->

                                    
                                    <li class="page-item" 
                                        :class="{
                                            'disabled': +currentPage === +pageCount
                                        }">
                                        <router-link :to="`/post/${+currentPage+1 <= +pageCount ? +currentPage+1 : +pageCount}`" class="page-link">Next</router-link>
                                    </li>
                                </ul>
                            </nav>

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
import { useRoute } from 'vue-router'

const route = useRoute();  // 路由


const loadingStatus = ref(false); // 載入狀態

const postsData = ref(null);
const postsCount = ref(null);  // 文章總數
const postsCountOfPage = ref(10);  // 一頁顯示幾篇

const pageCount = computed(()=>{
    return Math.ceil(postsCount.value / postsCountOfPage.value); // 總頁數
})

const currentPage = ref(route.params.page); // 路由參數 page (從1開始)

// 監視 路由參數 page
watch(
  () => route.params.page,
  (newValue, oldValue) => {
    // react to route changes...
    currentPage.value = newValue;

    getPostsData();  // 取得資料
  }
)


const currentStartIndex = computed(()=>{
    return (currentPage.value - 1) * postsCountOfPage.value;  // 起始索引 (從0開始)
})
// page 1: 0~9
// page 2: 10~19
// page 3: 20~29
// 依此類推...

// const currentPagination = computed(()=>{
//     // 假設有10頁,一次顯示五頁按鈕
//     // [1] 2 3 4 5
//     // 1 [2] 3 4 5
//     // 1 2 [3] 4 5
//     // 2 3 [4] 5 6
//     // 3 4 [5] 6 7
//     // ...
//     // 6 7 8 9 [10]
//     let tempArr = [];

//     // tempArr.push(currentPage); // 目前頁面
    
//     // if ( +currentPage === 1 ) {
//     //     // 第一頁
//     //     for(let ) {

//     //     }

//     // } else if () {

//     // } else {

//     // }
    
//     return [];  // 目前顯示頁碼
// })



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
        postsCount.value = data.total;
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