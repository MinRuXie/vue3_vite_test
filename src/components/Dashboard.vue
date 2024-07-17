<template>
    <h1>歡迎光臨</h1>

    <router-link to="/admin/login" class="btn btn-primary">登入</router-link>


    <!-- <TestChild v-model="title" /> -->

</template>
<script>
// import TestChild from './TestChild.vue';

export default {
    name: 'Dashboard',
    components: {
        // TestChild
    },

    setup() {
        // let title = "Hello";


        return {
            // title
        }
    }
}
</script>