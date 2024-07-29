<template>
    

    <div class="post-view">

        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="post-view-inner">
                        <h2>Keyword: {{ keyword }}</h2>

                        <template v-if="!loadingStatus">
                            載入文章列表中...
                        </template>
                        <template v-if="loadingStatus">
                            <p>共 {{ postsCount }} 篇搜尋結果 (API上限30篇)</p>

                            <!-- posts list -->
                            <PostList 
                                :postsData="postsData"
                            />
                        </template>

                    </div>
                </div>
            </div>
        </div>

    </div>

    

</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

// components
import PostList from './PostList.vue';


const route = useRoute();  // 路由

const keyword = ref(route.params.keyword); // 路由參數 keyword

const loadingStatus = ref(false); // 載入狀態
const postsData = ref(null);   // 文章資料 (API response)
const postsCount = ref(null);  // 文章總數 (API response)


// 監視 路由參數 page
watch(
  () => route.params.keyword,
  (newValue, oldValue) => {
    // react to route changes...
    keyword.value = newValue;

    getPostsData();  // 取得資料
  }
)


function getPostsData() {
    axios({
        method: 'get',
        url: `https://dummyjson.com/posts/search?q=${keyword.value}`,
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

    getPostsData();
})



</script>