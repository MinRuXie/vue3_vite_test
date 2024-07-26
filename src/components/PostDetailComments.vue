<template>

    <section>
        <h3>Comments</h3>
        <template v-if="!commentsLoadingStatus">
            評論資料載入中...
        </template>
        <template v-if="commentsLoadingStatus">
            <div class="card">
                <div class="card-body">
                    <ul class="list-group list-group-flush comment-wrap">
                        <template v-if="commentsData.comments.length <= 0">
                            目前沒有評論
                        </template>
                        <template v-if="commentsData.comments.length > 0">
                            <li class="list-group-item" 
                                v-for="(item, index) in commentsData.comments" :key="index">

                                <div class="fw-bold mb-2 mt-2">{{ item.user.username }}</div>
                                <p class="m-0">{{ item.body }}</p>
                                <div class="text-end">likes: {{ item.likes }}</div>
                            </li>
                        </template>
                    </ul>
                </div>
            </div>
        </template>
    </section>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const commentsData = ref(null);  // 評論資料
const commentsLoadingStatus = ref(false); // 評論資料載入狀態


// 取得評論資料
function getCommentsData() {
    return axios({
        method: 'get',
        url: `https://dummyjson.com/posts/${postData.value.id}/comments`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;

        commentsData.value = data;
        commentsLoadingStatus.value = true;

        console.log('commentsData.value', commentsData.value);
    })
    .catch(function (error) {
        console.log('取得失敗', error);
        alert('取得失敗');
    });
}


onMounted(()=>{
    getCommentsData();
})

</script>