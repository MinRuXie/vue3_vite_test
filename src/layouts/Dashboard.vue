<template>

    <div class="dashboard">
        <div class="container">
            <div class="row">
                <!-- 使用 自定義i18n插件 方法 1 -->
                <!-- <h1>{{ $translate('greetings.hello') }}</h1> -->
                <!-- 使用 自定義i18n插件 方法 2: -->
                <h1>{{ i18n.greetings.hello }}</h1>

                <h2>slot 練習</h2>
            </div>
            <div class="row">
                <div class="col-12 col-md-6">
                    <NewsCard>
                        <!-- Header slot -->
                        <template v-slot:header>
                            <h3>推薦文章</h3>
                        </template>

                        <!-- Body slot -->
                        <template v-slot:body>

                            <template v-if="postsError">
                                <p>文章資料載入失敗!</p>
                            </template>
                            <template v-else-if="postsData">
                                <ul>
                                    <li v-for="(post, index) in postsData" :key="index">
                                        <router-link :to="`/post/detail/${post.id}`">{{ post.title }}</router-link>
                                    </li>
                                </ul>
                            </template>
                            <template v-else>
                                <p>Loading...</p>
                            </template>

                        </template>

                        <!-- Footer slot -->
                        <template v-slot:footer>
                            <router-link :to="`/post/list/1`" class="icon-link">前往文章一覽</router-link>
                        </template>
                    </NewsCard>
                </div>

                <div class="col-12 col-md-6">
                    <NewsCard>
                        <!-- Header slot -->
                        <template v-slot:header>
                            <h3>推薦作者</h3>
                        </template>

                        <!-- Body slot -->
                        <template v-slot:body>

                            <template v-if="usersError">
                                <p>作者資料載入失敗!</p>
                            </template>
                            <template v-else-if="usersData">
                                <ul>
                                    <li v-for="(user, index) in usersData" :key="index">{{ user.username }}</li>
                                </ul>
                            </template>
                            <template v-else>
                                <p>Loading...</p>
                            </template>

                        </template>

                        <!-- Footer slot -->
                        <template v-slot:footer>
                            <router-link :to="`/author/list/1`" class="icon-link">前往作者一覽</router-link>
                        </template>
                    </NewsCard>

                </div>
            </div>
        </div>

        <div class="container">
            <div class="row">
                <div class="col-12">
                    <!-- Test -->
                    <button @click="flag = !flag">顯示 Parent 組件</button>
                    <!-- Parent 組件 -->
                    <Transition>
                        <TheParent v-if="flag" />
                    </Transition>
                </div>
            </div>
        </div>

        



    </div>


</template>

<script setup>
import { onMounted, ref, defineAsyncComponent  } from 'vue';
import axios from 'axios';

// 使用 自定義i18n插件 方法 2
import { inject } from 'vue';
const i18n = inject('i18n');


// components
import TheParent from '@/components/TheParent.vue';
import NewsCard from '@/components/NewsCard.vue';
// import LoadingComponent from '@/components/LoadingComponent.vue';

// aasync components
// const NewsCard = defineAsyncComponent(
//     // () => import('@/components/NewsCard.vue')

//     {
//         // 加载函数
//         loader: () => import('@/components/NewsCard.vue'),

//         // 加载异步组件时使用的组件
//         loadingComponent: LoadingComponent,
//         // 展示加载组件前的延迟时间，默认为 200ms
//         delay: 200,

//         // 加载失败后展示的组件
//         // errorComponent: ErrorComponent,
//         // 如果提供了一个 timeout 时间限制，并超时了
//         // 也会显示这里配置的报错组件，默认值是：Infinity
//         timeout: 3000
//     }
// )


const flag = ref(false);


const itemCount = ref(5);

const postsData = ref(null);   // 文章資料
const postsError = ref(null);  // 文章資料載入失敗

const usersData = ref(null);   // 使用者資料
const usersError = ref(null);  // 使用者資料載入失敗



// 取得文章資料
async function getPostsData() {
    return axios({
        method: 'get',
        url: `https://dummyjson.com/posts?limit=${itemCount.value}&skip=0`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;

        postsData.value = data.posts;
    })
    .catch(function (error) {
        console.log('取得失敗', error);
        postsError.value = error;
    });
}


// 取得 使用者資料
async function getUserData() {
    return axios({
        method: 'get',
        url: `https://dummyjson.com/users?limit=${itemCount.value}&skip=0`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;
        
        usersData.value = data.users;
    })
    .catch(function (error) {
        console.log('取得失敗', error);
        usersError.value = error;
    });
}


onMounted(async ()=>{
    await getPostsData();
    await getUserData();
})


</script>