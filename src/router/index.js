import { createRouter, createWebHashHistory } from 'vue-router'

import { useLoginStore } from '@/stores/login';


// VUE 3 課程筆記 (八) Vue Router
// https://hackmd.io/@vanCS/ByuzU-rcs
const router = createRouter({
    history: createWebHashHistory(),

    routes: [
        {
            path: '/',
            name: 'index', // 首頁
            component: () => import('../components/Dashboard.vue'),
        },
        {
            path: '/admin',
            name: 'admin', // 需登入頁面
            component: () => import('../components/admin/TheAdmin.vue'),
            children: [
                {
                    path: 'login',
                    name: 'login', // 登入頁面
                    component: () => import('../components/admin/TheLogin.vue')
                },
                {
                    path: 'home',
                    name: 'home', // 主頁 (登入看得到)
                    component: () => import('../components/admin/TheHome.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
            ]
        },
        {
            // 這邊就是用 ＊ 去選擇所有頁面比對有沒有符合的路徑
            // 如果沒有就會導到這個 router-link 來
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../components/NotFound.vue')
        },
    ]
})

router.beforeEach((to, from, next) => {

    // 檢查頁面是否需登入
    if ( to.meta.requiresAuth ) {
        const store = useLoginStore();  // Store
        
        // 使用 token 確認登入者身分
        /* providing token in bearer */
        fetch('https://dummyjson.com/auth/me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem("token")}`, 
            }, 
        })
        .then(res => {
            console.log(res.status); // Will show you the status
            if (!res.ok) {
                // throw new Error("HTTP status " + res.status);
                // 跳轉至登入頁
                router.push('/admin/login/');
            }
            return res.json();
        })
        .then(json => {
            console.log(json);

            // 把資料存入 store (若無此動作, 則未從登入流程抵達頁面都將丟失 store 資料)
            store.user_name = `${json.firstName} ${json.lastName}`;

            next();
        });

        
    } else {
        next();
    }



    // next();
});

export default router