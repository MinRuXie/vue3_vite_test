<template>

    <div class="post-wrap">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="post-inner-wrap">
                        <router-link :to="`/post/1`">返回文章列表</router-link>
                        
                        <article v-if="!postsLoadingStatus">
                            文章資料載入中...
                        </article>

                        <!-- 文章內容 -->
                        <article v-if="postsLoadingStatus">

                            <header class="post-header">
                                <h1>{{ postData.title }}</h1>
                                <div class="tags-wrap">
                                    <span v-for="(tag, tagIndex) in postData.tags" :key="tagIndex" class="badge text-bg-primary rounded-pill">{{ tag }}</span>
                                </div>
                            </header>

                            <div class="post-content">
                                {{ postData.body }}
                            </div>

                            <footer class="post-footer">
                                <span>likes: {{ postData.reactions.likes }}</span>
                                <span>dislikes: {{ postData.reactions.dislikes }}</span>
                                <span>views: {{ postData.views }}</span>
                            </footer>
                            

                            <!-- 作者 -->
                            <PostDetailAuthor
                                :userId="postData.userId"
                            />

                            <!-- 評論 -->
                            <PostDetailComments 
                                :postId="postData.id"
                            />
                        </article>

                    </div>
                </div>
            </div>
        </div>
    </div>


</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

// components
import PostDetailAuthor from './PostDetailAuthor.vue';
import PostDetailComments from './PostDetailComments.vue';


const route = useRoute();  // 路由

const postId = ref(route.params.id); // 路由參數 id
const postData = ref(null);  // 文章資料
const postsLoadingStatus = ref(false); // 文章資料載入狀態






// 取得文章資料
function getPostData() {
    return axios({
        method: 'get',
        url: `https://dummyjson.com/posts/${postId.value}`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;

        postData.value = data;
        postsLoadingStatus.value = true;

        // console.log('data', data);
        console.log('postData.value', postData.value);
    })
    .catch(function (error) {
        console.log('取得失敗', error);
        alert('取得失敗');
    });
}





async function getData() {
    await getPostData();
    // await getUserData();
    // await getCommentsData();
}




// 監視 路由參數 page
watch(
  () => route.params.id,
  (newValue, oldValue) => {
    // react to route changes...
    postId.value = newValue;

    getData();  // 取得資料
  }
)


onMounted(()=>{
    console.log('onMounted');

    getData();  // 取得資料
})



</script> 