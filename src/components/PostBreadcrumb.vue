<template>

    <nav style="--bs-breadcrumb-divider: '>';" aria-label="breadcrumb" class="breadcrumb-wrap">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="#">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Library</li>
        </ol>
    </nav>

    route.name: {{ route.name }}<br>
    breadcrumbList: <pre>{{ breadcrumbList }}</pre>

</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const breadcrumbList = ref([]);

// const isHome = computed(() => {
//     return route.name === 'post'
// })

let matched = route.matched;

console.log('matched', matched);

function getBreadcrumbs() {
  let matched = route.matched;  // 回傳 父層所有路由 & 自己的路由

  matched[0]; // 父層所有路由
  matched[1]; // 自己的路由

  console.log('matched', matched);
  //   if (!isHome(matched[0])) {
  //     matched = [{ path: '/', meta: { title: '首頁' } }].concat(matched)
  //   }
  breadcrumbList.value = matched;
}
  



watch(route, () => {
  getBreadcrumbs()
})


onMounted(() => {
  getBreadcrumbs()
})



</script>