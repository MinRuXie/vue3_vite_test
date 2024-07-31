<template>

    <nav class="post-sidenav">
        
        <div class="card">
            <div class="card-body">

                <div class="search-bar-wrap">
                    <h5>搜尋文章</h5>

                    <!-- posts search bar -->
                    <PostSearchBar />
                </div>
                
            </div>
        </div>

        <div class="card">
            <div class="card-body">

                <div class="post-tags">
                    <h5>文章標籤</h5>

                    <!-- post tags -->
                    <PostTagsList
                        :postTags="postTags"
                    />
                </div>
                
            </div>
        </div>

    </nav>

    

</template>
<script setup>
import { onMounted, ref } from 'vue';

import axios from 'axios';

// components
import PostSearchBar from '@/components/PostSearchBar.vue';
import PostTagsList from '@/components/PostTagsList.vue';


const postTags = ref(null);


function getPostTags() {
    // Get all posts tags
    // fetch('https://dummyjson.com/posts/tags')
    // .then(res => res.json())
    // .then(console.log);

    // 'https://dummyjson.com/posts/tag-list'

    axios({
        method: 'get',
        url: `https://dummyjson.com/posts/tag-list`,
    })
    .then(function (response) {
        console.log('post tags 取得成功', response);
        const data = response.data;

        postTags.value = data;

        // console.log('userData.value', userData.value);
    })
    .catch(function (error) {
        console.log('post tags 取得失敗', error);
        alert('取得失敗');
    });
}


onMounted(()=>{
    getPostTags();
})

</script>