<template>

    <section class="comment-section">
        <h3>Comments</h3>

        <div class="card">
            <div class="card-body">

                <template v-if="commentsError">
                    <p>評論資料載入失敗!</p>
                </template>
                <template v-else-if="commentsData">
                    <p v-if="commentsData.length <= 0" class="list-group-item">目前沒有評論</p>
                    <ul v-else class="list-group list-group-flush comment-wrap">
                        <li class="list-group-item" 
                            v-for="(item, index) in commentsData" :key="index">

                            <!-- username -->
                            <div class="fw-bold mb-2 mt-2">
                                {{ item.user.username }}
                                <span v-if="item.user.username == userStore.username" class="text-info">(You)</span>
                            </div>

                            <!-- comment -->
                            <p class="m-0">{{ item.body }}</p>

                            <!-- likes -->
                            <div class="text-end">likes: {{ item.likes }}</div>
                        </li>
                    </ul>
                </template>
                <template v-else>
                    <p>Loading...</p>
                </template>

                <ul class="list-group list-group-flush comment-wrap">
                    
                    <li v-if="commentsError" class="list-group-item">評論載入失敗!</li>

                    <template v-else>
                        <li v-if="!commentsData" class="list-group-item">載入評論中...</li>
                        
                        <template v-else>
                            
                        </template>
                    </template>
                    
                </ul>
            </div>
        </div>


        <div class="card mt-2">
            <div class="card-body">
                <h4>我要評論</h4>

                <template v-if="!userStore.isLogin">
                    <p>登入方可留言!</p>
                    <router-link to="/admin/login" class="btn btn-primary">登入</router-link>
                </template>
                <template v-if="userStore.isLogin">
                    <Form @submit="onSubmit">

                        <fieldset>
                            <div class="fw-bold mb-2 mt-2">{{ userStore.username }}</div>
                            <Field as="textarea" 
                                name="description" 
                                id="description" 
                                rows="4" 
                                placeholder="請輸入評論..." 
                                class="form-control" 
                                v-model="formData.body"
                                :rules="validateRequired" 
                            />
                            
                            <ErrorMessage name="description" />
                        </fieldset>

                        <button class="btn btn-primary" :disabled="statusAdding">送出評論</button>
                        <span v-show="statusAdding">評論中...請稍後</span>
                    </Form>
                </template>

                
            </div>
        </div>

    </section>

</template>

<script setup>
import { reactive, ref, onMounted } from 'vue';
import axios from 'axios';

// 匯入 VeeValidate Component
import { Form, Field, ErrorMessage } from 'vee-validate';

// stores
import { useUserStore } from '@/stores/user';

const userStore = useUserStore();  // Store

// 接收 props 的資料
const props = defineProps({
    postId: Number
})



// 表單資料
let formData = reactive({
    body: '',
    postId: props.postId,
    userId: userStore.userId,
})

const statusAdding = ref(false);


const commentsData = ref(null);  // 評論資料
const commentsError = ref(null);  // 評論資料載入失敗


// 取得評論資料
function getCommentsData() {
    return axios({
        method: 'get',
        url: `https://dummyjson.com/posts/${props.postId}/comments`,
    })
    .then(function (response) {
        console.log('取得成功', response);
        const data = response.data;

        commentsData.value = data.comments;
    })
    .catch(function (error) {
        console.log('取得失敗', error);
        commentsError.value = error;
    });
}


onMounted(()=>{
    getCommentsData();
})



// 送出表單資料 (當 <Form> 中的 <Field> 有 :rule 不通過時, 不會執行此方法 )
function onSubmit(values) {
    console.log('Submitted', values);
    console.log(JSON.stringify(values, null, 2));

    statusAdding.value = true;

    // Add a new comment
    axios({
        method: 'post', // put(替換資源)、patch(更換資源部分內容)
        url: `https://dummyjson.com/comments/add`,
        headers: { 'Content-Type': 'application/json' },
        data: formData,
    })
    .then(function (response) {
        console.log('新增成功', response);
        alert('新增成功! (測試用API不會更新資料至資料庫，跳轉至別頁後恢復原始資料)');
        const data = response.data;


        // 將 新增資料 加入 現有資料
        commentsData.value.push({ ...data, likes: 0 });

       // 清空輸入框
       formData.body = '';
       statusAdding.value = false;
            
    })
    .catch(function (error) {
        console.log('新增失敗', error);
        alert('新增失敗，資料錯誤');
        statusAdding.value = false;
    });
}

// 驗證表單必填欄位
function validateRequired(value) {
    // if the field is empty
    if (!value) {
        console.log(value, 'This field is required');
        return 'This field is required';
    }

    // All is good
    return true;
}





</script>