<template>

    <p class="mt-2">
        顯示第 {{ currentStartIndex + 1 }} - {{ currentStartIndex + dataCountOfPage }} 筆, 
        共 {{ dataCount }} 筆資料, 共 {{ pageCount }} 頁
    </p>

    <nav aria-label="Page navigation example" class="pagination-wrap">
        <ul class="pagination">
            <li class="page-item" 
                :class="{ 'disabled': props.currentPage === 1 }">
                <router-link class="page-link" :to="`${props.preUrl}/${paginationPrev}`">Previous</router-link>
            </li>

            <li class="page-item" 
                v-for="(item, index) in pageCount" :key="index"
                v-show="index >= paginationStart-1 && index < paginationEnd">

                <router-link aria-current="page" href="#"
                    class="page-link"
                    :class="{ 'active': +item === props.currentPage }"
                    :to="`${props.preUrl}/${item}`"
                >{{ item }}</router-link>
            </li>
            
            <li class="page-item" 
                :class="{ 'disabled': props.currentPage === +pageCount }">
                <router-link class="page-link" :to="`${props.preUrl}/${paginationNext}`">Next</router-link>
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
    dataCount: Number,   // 資料總筆數
    dataCountOfPage: Number,  // 每頁顯示幾筆資料
    currentPage: Number,  // 目前頁數
    currentStartIndex: Number,  // 目前起始文章索引
    preUrl: String,  // 頁碼參數前方的 url
})

// 分頁總頁數
const pageCount = computed(()=>{
    return Math.ceil(props.dataCount / props.dataCountOfPage); 
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