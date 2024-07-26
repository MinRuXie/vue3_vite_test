<template>

    <section>
        <h3>Author</h3>
        <template v-if="!userLoadingStatus">
            作者資料載入中...
        </template>
        <template v-if="userLoadingStatus">
            <div class="card mb-3">
                <div class="row g-0">
                    <div class="col-md-2">
                        <img :src="userData.image" alt="avator" class="img-fluid rounded-start">
                    </div>
                    <div class="col-md-10">
                        <div class="card-body">
                            <h5 class="card-title">{{ userData.firstName }} {{ userData.lastName }}</h5>
                            <p class="card-text">{{ userData.email }}</p>
                            <p class="card-text"><small class="text-body-secondary">{{ userData.university }}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </section>

</template>
<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// 接收 props 的資料
const props = defineProps({
    userId: Number,
})


const userData = ref(null);  // 作者資料
const userLoadingStatus = ref(false); // 作者資料載入狀態

// 取得作者資料
async function getUserData() {
    return axios({
        method: 'get',
        url: `https://dummyjson.com/users/${props.userId}`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;

        userData.value = data;
        userLoadingStatus.value = true;

        console.log('userData.value', userData.value);
    })
    .catch(function (error) {
        console.log('取得失敗', error);
        alert('取得失敗');
    });
}

onMounted(()=>{
    getUserData();
})

</script>