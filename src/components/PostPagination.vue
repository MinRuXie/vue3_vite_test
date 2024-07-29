<template>

    <p class="mt-2">
        目前為第 {{ currentPage }} 頁, 顯示第 {{ currentStartIndex + 1 }} - {{ currentStartIndex + postsCountOfPage }} 篇, 共 {{ postsCount }} 篇文章
    </p>

    <nav aria-label="Page navigation example" class="pagination-wrap">
        <ul class="pagination">
            <li class="page-item" 
                :class="{ 'disabled': props.currentPage === 1 }">
                <router-link class="page-link" :to="`/post/${paginationPrev}`">Previous</router-link>
            </li>

            <li class="page-item" 
                v-for="(item, index) in pageCount" :key="index"
                v-show="index >= paginationStart-1 && index < paginationEnd">

                <router-link aria-current="page" href="#"
                    class="page-link"
                    :class="{ 'active': +item === props.currentPage }"
                    :to="`/post/${item}`"
                >{{ item }}</router-link>
            </li>
            
            <li class="page-item" 
                :class="{ 'disabled': props.currentPage === +pageCount }">
                <router-link class="page-link" :to="`/post/${paginationNext}`">Next</router-link>
            </li>
        </ul>
    </nav>


</template>

<script setup>
import { computed, ref } from 'vue';


// Vue3 pagination 頁數太多怎麼辦｜無套件
// https://medium.com/wendy-loops/vue3-pagination-a93022862051


// 接收 props
const props = defineProps({
    postsCount: Number,   // 文章總數
    currentPage: Number,  // 目前頁數
    postsCountOfPage: Number,  // 每頁顯示幾篇文章
    currentStartIndex: Number,  // 目前起始文章索引
})

// 分頁總頁數
const pageCount = computed(()=>{
    return Math.ceil(props.postsCount / props.postsCountOfPage); 
})



// 頁碼數量: 最多顯示幾個頁碼按鈕
const paginationCount = ref(5);


// 起始頁碼
const paginationStart = computed(()=>{

    // 若 目前頁數+頁碼數量 <= 總頁數, 那就讓 start = 目前頁數
    if( (props.currentPage + +paginationCount.value) <= +pageCount.value ){
        return props.currentPage

    // 若 目前頁數+頁碼數量 > 總頁數, 或者 目前頁數 == 總頁數, 那就讓 start = 目前頁數-頁碼數量-1
    } else if( (props.currentPage + +paginationCount.value) > +pageCount.value || props.currentPage === +pageCount.value ){
        return +pageCount.value - (+paginationCount.value - 1)
    }
})


// 結束頁碼
const paginationEnd = computed(()=>{

    // 若 目前頁數+頁碼數量 <= 總頁數, 那就讓 end = 目前頁數 + 頁碼數量-1
    if( (props.currentPage + +paginationCount.value) <= +pageCount.value ){
        return props.currentPage + (+paginationCount.value - 1)

    }else if( (props.currentPage + +paginationCount.value) > +pageCount.value || props.currentPage === +pageCount.value ){
        return +pageCount.value
    }
})


// 上一頁頁碼
const paginationPrev = computed(()=>{
    return props.currentPage-1 >= 1 ? props.currentPage-1 : 1;
})


// 下一頁頁碼
const paginationNext = computed(()=>{
    return props.currentPage+1 <= +pageCount.value ? props.currentPage+1 : +pageCount.value;
})






</script>