<template>
    <h2>修改帳戶資訊</h2>

    <!-- <template v-if="!data.newUserData">
        載入中...
    </template>
    <template v-if="data.newUserData">
        <img :src="data.newUserData.image" alt="avator" width="100">

        <ul class="list-group list-group-flush">
            <li class="list-group-item">username: {{ data.newUserData.username }}</li>
            <li class="list-group-item">password: {{ data.newUserData.password }}</li>
            <li class="list-group-item">
                <label>name:</label>
                <input type="text" v-model="data.newUserData.firstName">
                <input type="text" v-model="data.newUserData.lastName">
            </li>
            <li class="list-group-item">
                <label>gender:</label>
                <select v-model="data.newUserData.gender">
                    <option value="female">female</option>
                    <option value="male">male</option>
                </select>
            </li>
        </ul>

        
        <router-link to="/admin/home/account" class="btn btn-primary">返回</router-link>
        <button @click="modifyUserInfo" class="btn btn-primary">儲存</button>
        
    </template> -->

    {{ initData }}
</template>

<script>
import { toRef, toRaw, reactive, onMounted, nextTick } from 'vue';

export default {
    name: 'UserInfoModify',
    props: ['data'],

    setup(props) {

        let initData = toRef(props, 'data');

        // 資料
        let data = reactive({
            userData: null,
        })


        // function modifyUserInfo() {
        //     // 蒐集資料





        // }


        onMounted(()=>{
            
            // 複製一份原始資料用作修改
            // Unable to use structuredClone() on value of ref variable
            // https://stackoverflow.com/questions/72632173/unable-to-use-structuredclone-on-value-of-ref-variable
            // data.userData = structuredClone( toRaw(initData.value.userData) );

            // console.log('data.userData', data.userData);

            

            nextTick(()=>{
                console.log('props.data', props.data);
            })
            


        })




        return {
            data,
            initData,
            modifyUserInfo,
        }
    }
}
</script>