<template>

    <div class="card">
        <div class="card-body">

            <h2>{{ title }}列表</h2>

            

            <router-link :to="`/${routeName}/list/1`" class="icon-link">More</router-link>


        </div>
    </div>


</template>

<script setup>

const props = defineProps({
    title: String,
    routeName: String,
})



</script>