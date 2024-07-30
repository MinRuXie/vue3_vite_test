<template>

    <div class="search-bar-wrap">
        <h5>搜尋文章</h5>
        <div class="search-bar">
            <input type="text" placeholder="請輸入關鍵字..." v-model="keyword" class="form-control">
            <button @click="searchPosts" class="btn btn-primary">搜尋</button>
        </div>
    </div>

</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from "vue-router";


const router = useRouter(); // 路由器

// data
const keyword = ref('');



// search posts
function searchPosts() {
    
    if ( keyword.value ) {
        
        // 跳轉至搜尋頁
        router.push(`/post/search/${keyword.value}`);
        keyword.value = '';
    } else {
        alert('請輸入關鍵字!');
    }


    
}



</script>