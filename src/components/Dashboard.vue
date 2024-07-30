<template>

    <div class="dashboard">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="dashboard-inner">

                        <h2>首頁</h2>

                        <ul>
                            <li><router-link :to="`/author`">作者列表</router-link></li>
                            <li><router-link :to="`/post`">文章列表</router-link></li>
                        </ul>

                    </div>
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


</script>