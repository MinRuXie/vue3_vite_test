<template>

    <div class="card" v-for="(user, index) in userData" :key="index">
        <div class="card-body">
            <div class="container">
                <div class="row">
                    <div class="col-2">
                        <img :src="user.image" alt="avator" width="50" height="50">
                        {{ user.username }}<br>
                    </div>
                    <div class="col-10">
                        <template v-if="user.customPostsLoading">
                            文章資料載入中...
                        </template>
                        <template v-else>
                            <span v-if="user.customPosts && user.customPosts.length <= 0">沒有文章資料</span>
                            <ul v-if="user.customPosts && user.customPosts.length > 0" class="list-group">
                                <li v-for="(post, postIndex) in user.customPosts" :key="postIndex" class="list-group-item">
                                    <router-link :to="`/post/detail/${post.id}`">{{ post.title }}</router-link>
                                </li>
                            </ul>
                        </template>
                    </div>
                </div>
            </div>

        </div>
    </div>

</template>

<script setup>

// 接收 props 資料
const props = defineProps({
    userData: Array,  // 使用者資料
})


</script>