<template>
    

    <div class="login">
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="login-inner">

                        <!-- 阻止預設表單提交行為, 使用 onSubmit 來處理 -->
                        <!-- <form novalidate @submit.prevent="onSubmit"> -->

                        <!-- 1. Replace <form> with <Form /> 
                            but remove both the .prevent modifier and the novalidate attribute. -->
                        <Form @submit="onSubmit">

                            <h3>Login</h3>

                            <fieldset>
                                <label for="username" class="required">帳號</label>

                                <!-- 2. Replace <input> with <Field /> while keeping the same attributes. -->
                                <!-- <input type="text" v-model="formData.username"> -->
                                <Field type="text" 
                                    id="username"
                                    name="username"
                                    placeholder="請輸入帳號"
                                    v-model="formData.username" 
                                    :rules="validateRequired" 
                                />

                                <!-- 3. Add the <ErrorMessage /> component to your template, 
                                    passing a name prop that matches the <Field /> name prop -->
                                <ErrorMessage name="username" />
                            </fieldset>

                            <fieldset>
                                <label for="password" class="required">密碼</label>

                                <!-- 2. Replace <input> with <Field /> while keeping the same attributes. -->
                                <!-- <input type="password" v-model="formData.password"> -->
                                <Field type="password" 
                                    id="password" 
                                    name="password"
                                    placeholder="請輸入密碼"
                                    v-model="formData.password"
                                    :rules="validateRequired" 
                                />

                                <!-- 3. Add the <ErrorMessage /> component to your template, 
                                    passing a name prop that matches the <Field /> name prop -->
                                    <ErrorMessage name="password" />
                            </fieldset>
                            
                            <!-- <button @click="userStore.login(formData)" class="btn btn-primary">Login</button> -->

                            <button class="btn btn-primary">登入</button>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    </div>
    

</template>
<script>
import { reactive } from 'vue';
import { useUserStore } from '@/stores/user';

// 匯入 VeeValidate Component
import { Form, Field, ErrorMessage } from 'vee-validate';


export default {
    name: 'TheLogin',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {

        const userStore = useUserStore();  // Store

        // 表單資料
        let formData = reactive({
            username: 'emilys',
            password: 'emilyspass',
        })

        
        // 送出表單資料 (當 <Form> 中的 <Field> 有 :rule 不通過時, 不會執行此方法 )
        function onSubmit(values) {
            console.log('Submitted', values);
            console.log(JSON.stringify(values, null, 2));

            // 傳送表單資料 進行登入驗證
            userStore.login(formData);
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


        return {
            formData,
            userStore,

            onSubmit,
            validateRequired,
        }
    }
}
</script>