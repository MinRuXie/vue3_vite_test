<template>

    

    <ol class="list-group list-group-numbered">
        <li v-for="(post, postIndex) in props.postsData" :key="postIndex"
            class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold">
                    <router-link :to="`/post/detail/${post.id}`">{{ post.title }}</router-link>
                </div>
            </div>

            <!-- post tags -->
            <PostTagsList
                :postTags="post.tags"
            />
        </li>
    </ol>

</template>
<script setup>
// components
import PostTagsList from '@/components/PostTagsList.vue';

// 接收 props 的資料
const props = defineProps({
    postsData: Array,  // 文章資料
})



</script>