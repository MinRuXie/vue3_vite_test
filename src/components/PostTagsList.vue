<template>

    <div class="tags-wrap">

        <template v-for="(tag, index) in props.postTags" :key="index">
            <router-link :to="`/post/category/${tag}/1`">
                <span class="badge text-bg-primary rounded-pill">{{ tag }}</span>
            </router-link>
        </template>

    </div>
    
</template>

<script setup>


// 從 props 接收資料
const props = defineProps({
    postTags: Array,
})


</script>