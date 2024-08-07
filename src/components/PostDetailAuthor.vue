<template>


    <section class="author-section">
        <h3>Author</h3>

        <div class="card">

            <template v-if="userError">
                <div class="card-body">
                    <p>作者資料載入失敗!</p>
                </div>
            </template>
            <template v-else-if="userData">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img :src="userData.image" alt="avator" class="img-fluid rounded-start">
                    </div>
                    <div class="col-md-10">
                        <div class="card-body">
                            <h5 class="card-title">{{ userData.firstName }} {{ userData.lastName }}</h5>
                            <p class="card-text">{{ userData.email }}</p>
                            <p class="card-text"><small class="text-body-secondary">{{ userData.university }}</small></p>
                        </div>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="card-body">
                    <p>Loading...</p>
                </div>
            </template>

        </div>

        <div v-if="userData" class="card mt-2">
            <div class="card-body">
                <h4 class="mb-4">This Anthor's Posts</h4>

                <template v-if="userData.customPostsError">
                    <p>文章資料載入失敗!</p>
                </template>
                <template v-else-if="userData.customPosts">
                    <span v-if="userData.customPosts.length <= 0">沒有文章資料</span>
                    <ul v-else>
                        <li v-for="(post, postIndex) in userData.customPosts" :key="postIndex">
                            
                            <template v-if="post.id === props.postId">
                                {{ post.title }} <span class="text-info">(This Post)</span>
                            </template>
                            <template v-else>
                                <router-link :to="`/post/detail/${post.id}`">{{ post.title }}</router-link>
                            </template>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <p>Loading...</p>
                </template>

            </div>
        </div>

    </section>


</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 接收 props 的資料
const props = defineProps({
    userId: Number,
    postId: Number,
})


const userData = ref(null);  // 作者資料
const userError = ref(null);  // 作者資料載入失敗


// 取得作者資料
async function getUserData() {
    return axios({
        method: 'get',
        url: `https://dummyjson.com/users/${props.userId}`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;

        userData.value = data;
        // userLoadingStatus.value = true;

        // console.log('userData.value', userData.value);
    })
    .catch(function (error) {
        console.log('取得失敗', error);
        userError.value = error;
    });
}

// 取得 特定使用者的文章資料
async function getPostsOfUser(user) {
    console.log('user----', user)
    return axios({
        method: 'get',
        url: `https://dummyjson.com/users/${user.id}/posts`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;
        
        // 將文章資料塞入對應的作者中
        user['customPosts'] = data.posts;
        // user['customPostsLoading'] = false;
    })
    .catch(function (error) {
        console.log('取得失敗', error);
        user['customPostsError'] = error;
    });
}

// 取得資料的流程控制
async function getData() {
    await getUserData();

    getPostsOfUser(userData.value);
}


onMounted(async ()=>{
    
    getData();

})

</script>