<template>

    <nav class="admin-nav">

        <div class="nav-inner">
            <h1 class="nav-title">會員中心</h1>

            <div class="user-info">
                <span>Hello, {{ store.user_name }}!</span>
                <button @click="store.logOut" class="btn btn-primary">登出</button>
            </div>
        </div>
        
    </nav>

</template>

<script>
import { useLoginStore } from '@/stores/login';

export default {
    name: 'TheNavigation',
    setup() {
        const store = useLoginStore();  // Store


        return {
            store,
        }
    }
}
</script>