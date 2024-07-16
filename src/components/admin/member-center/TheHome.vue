<template>

    <!-- Nav -->
    <TheNavigation />

    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="admin-home">
                    <h3>主頁</h3>
                    
                    <!-- 根據路由決定顯示的組件 -->
                    <router-view></router-view>

                    <router-link to="/admin/home/account" class="btn btn-primary">展示資訊</router-link>
                    <router-link to="/admin/home/account-modify" class="btn btn-primary">修改資訊</router-link>
                </div>
            </div>
        </div>
    </div>

    

    
</template>
<script>
import { useLoginStore } from '@/stores/login';
// import { useRouter } from "vue-router";

// components
import TheNavigation from './TheNavigation.vue';
// import UserInfo from './user/UserInfo.vue';

export default {
    name: 'TheHome',
    components: {
        TheNavigation,
        // UserInfo,
    },

    setup() {

        const store = useLoginStore();  // Store
        // const router = useRouter(); // 路由



        


        return {
            store,
        }
    }
}
</script>