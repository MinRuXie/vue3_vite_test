<template>

    <template v-if="!initData.userData && !initData.postsData">
        載入中...
    </template>

    <template v-if="initData.userData">
        <img :src="initData.userData.image" alt="avator" width="100">

        <div>
            <h4>帳戶資訊</h4>
            <router-link to="/admin/home/account-modify" class="btn btn-primary">編輯</router-link>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">username: {{ initData.userData.username }}</li>
                <li class="list-group-item">password: {{ initData.userData.password }}</li>
                <li class="list-group-item">name: {{ initData.userData.firstName }} {{ initData.userData.lastName }}</li>
                <li class="list-group-item">gender: {{ initData.userData.gender }}</li>
            </ul>
        </div>
    </template>
    <template v-if="initData.postsData">
        <div>
            <h4>撰寫文章</h4>
            <span>共{{ initData.postsData.total }}篇</span>
            <ul class="list-group list-group-flush">
                <li v-for="(item, index) of initData.postsData.posts" :key="index" class="list-group-item">
                    {{ item.title }} --- 瀏覽:{{ item.views }}次 / 喜歡:{{ item.reactions.likes }}人 / 不喜歡: {{ item.reactions.dislikes }}人
                </li>
            </ul>
        </div>
    </template>

        

    

    

    <!-- userData: <pre>{{ userData }}</pre> -->

</template>

<script>
import { toRef } from 'vue';

export default {
    name: 'UserInfo',
    props: ['data'],
    setup(props) {
        let initData = toRef(props, 'data');



        return {
            initData
        }
    }
}
</script>