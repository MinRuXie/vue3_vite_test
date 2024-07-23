<template>
    <h2>修改帳戶資訊</h2>

    <section>
        <header class="section-header">
            <h4>帳戶資訊</h4>
            <router-link to="/admin/home/account" class="btn btn-primary">返回</router-link>
        </header>
        
        <div class="card">
            <div class="card-body">

                <!-- 1. Replace <form> with <Form /> 
                    but remove both the .prevent modifier and the novalidate attribute. -->
                <Form @submit="onSubmit">
                    
                    <fieldset>
                        <label for="firstName" class="required">first name</label>

                        <!-- 2. Replace <input> with <Field /> while keeping the same attributes. -->
                        <Field type="text" 
                            id="firstName"
                            name="firstName"
                            class="form-control"
                            placeholder="請輸入姓氏"
                            v-model="formData.firstName" 
                            :rules="validateRequired" 
                        />
                        <!-- 3. Add the <ErrorMessage /> component to your template, 
                            passing a name prop that matches the <Field /> name prop -->
                        <ErrorMessage name="firstName" />
                    </fieldset>

                    <fieldset>
                        <label for="lastName" class="required">last name</label>

                        <!-- 2. Replace <input> with <Field /> while keeping the same attributes. -->
                        <Field type="text" 
                            id="lastName"
                            name="lastName"
                            class="form-control"
                            placeholder="請輸入姓名"
                            v-model="formData.lastName" 
                            :rules="validateRequired" 
                        />
                        <!-- 3. Add the <ErrorMessage /> component to your template, 
                            passing a name prop that matches the <Field /> name prop -->
                        <ErrorMessage name="lastName" />
                    </fieldset>

                    <fieldset>
                        <label for="gender" class="required">gender</label>

                        <!-- 2. Replace <input> with <Field /> while keeping the same attributes. -->
                        <Field as="select" 
                            id="gender"
                            name="gender"
                            class="form-select"
                            v-model="formData.gender" 
                            :rules="validateRequired">
                    
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </Field>
                        <!-- 3. Add the <ErrorMessage /> component to your template, 
                            passing a name prop that matches the <Field /> name prop -->
                        <ErrorMessage name="gender" />
                    </fieldset>

                    <fieldset>
                        <label for="email" class="required">email</label>

                        <!-- 2. Replace <input> with <Field /> while keeping the same attributes. -->
                        <Field type="text" 
                            id="email"
                            name="email"
                            class="form-control"
                            placeholder="請輸入email"
                            v-model="formData.email" 
                            :rules="validateRequired" 
                        />
                        <!-- 3. Add the <ErrorMessage /> component to your template, 
                            passing a name prop that matches the <Field /> name prop -->
                        <ErrorMessage name="email" />
                    </fieldset>

                    <footer class="form-footer">
                        <button class="btn btn-primary">儲存</button>
                    </footer>
                </Form>

            </div>
        </div>

        
    </section>

    <pre>{{ formData }}</pre>
    


</template>

<script setup>
import { toRef, toRaw, reactive, onMounted, nextTick } from 'vue';
import axios from 'axios';  // axios

// 匯入 VeeValidate Component
import { Form, Field, ErrorMessage } from 'vee-validate';

import { useUserStore } from '@/stores/user'; // stores


const userStore = useUserStore();  // Store



// 表單資料: 使用 store 的資料作為預設值
let formData = reactive({
    firstName: userStore.userFirstName,
    lastName: userStore.userLastName,
    gender: userStore.userGender,
    email: userStore.userEmail,
})


// 送出表單資料 (當 <Form> 中的 <Field> 有 :rule 不通過時, 不會執行此方法 )
function onSubmit(values) {
    console.log('Submitted', values);
    console.log(JSON.stringify(values, null, 2));



    /* updating lastName of user with id */
    axios({
        method: 'patch', // put(替換資源)、patch(更換資源部分內容)
        url: `https://dummyjson.com/users/${userStore.userId}`,
        headers: { 'Content-Type': 'application/json' },
        data: formData,
    })
    .then(function (response) {
        console.log('更新成功', response);
        alert('更新成功! (測試用API不會更新資料至資料庫，跳轉至別頁後恢復原始資料)');
        const data = response.data;

        // 將 更新後的資料 存入 Pinia Store
        userStore.userFirstName = data.firstName;
        userStore.userLastName = data.lastName;
        userStore.userGender = data.gender;
        userStore.userEmail = data.email;
    })
    .catch(function (error) {
        console.log('更新失敗', error);
        alert('更新失敗，資料錯誤');
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