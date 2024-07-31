<template>

    <div class="dashboard">
        <div class="container">
            <div class="row">
                <div class="col-6">
                    <NewsCard 
                        title="文章"
                        routeName="post"
                    />
                </div>
                <div class="col-6">
                    <NewsCard 
                        title="作者"
                        routeName="author"
                    />
                </div>
            </div>
        </div>
    </div>


    <!-- Parent 組件 -->
    <!-- <TheParent /> -->

</template>

<script setup>

// components
// import TheParent from './TheParent.vue';
import NewsCard from '@/components/NewsCard.vue';


</script>