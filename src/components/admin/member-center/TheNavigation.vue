<template>

    <nav class="admin-nav">

        <div class="nav-inner">
            <h1 class="nav-title">會員中心</h1>

            <div class="user-info">
                <span>Hello, {{ userStore.userFullName }}!</span>
                <button @click="userStore.logOut" class="btn btn-primary">登出</button>
            </div>
        </div>
        
    </nav>

</template>

<script>
import { useUserStore } from '@/stores/user';

export default {
    name: 'TheNavigation',
    setup() {
        const userStore = useUserStore();  // Store


        return {
            userStore,
        }
    }
}
</script>