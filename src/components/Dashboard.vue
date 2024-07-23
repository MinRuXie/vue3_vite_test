<template>
    <h1>歡迎光臨</h1>

    <router-link to="/admin/login" class="btn btn-primary">登入</router-link>

    <!-- Parent 組件 -->
    <TheParent />

</template>

<script setup>
import TheParent from './TheParent.vue';


</script>