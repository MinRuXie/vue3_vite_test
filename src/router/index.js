import { createRouter, createWebHashHistory } from 'vue-router'

import { useUserStore } from '@/stores/user';


// VUE 3 課程筆記 (八) Vue Router
// https://hackmd.io/@vanCS/ByuzU-rcs
const router = createRouter({
    history: createWebHashHistory(),

    routes: [
        {
            path: '/', // dynamic segments start with a colon
            name: 'index', // 首頁
            component: () => import('../components/Dashboard.vue'),
            redirect: { path: '/post' },
            meta: { title: '首頁' },
        },
        {
            path: '/post',
            name: 'post', // 文章
            component: () => import('../components/PostIndex.vue'),
            redirect: { path: '/post/list/1' }, // 導向文章列表第一頁
            children: [
                {
                    path: 'list/:page',
                    name: 'postList',
                    component: () => import('../components/PostView.vue'),
                    meta: { title: '文章列表' },
                },
                {
                    path: 'detail/:id',
                    name: 'postDetail',
                    component: () => import('../components/PostDetailView.vue'),
                    meta: { title: '文章內頁' },
                },
                {
                    path: 'search/:keyword',
                    name: 'postSearch',
                    component: () => import('../components/PostSearchResultView.vue'),
                    meta: { title: '搜尋文章' },
                },
            ]
        },
        
        {
            path: '/admin',
            name: 'admin', // 後台
            component: () => import('../components/admin/TheAdmin.vue'),
            redirect: { name: 'home' },
            meta: { title: '後台' },
            children: [
                {
                    path: 'login',
                    name: 'login', // 後台登入
                    component: () => import('../components/admin/TheLogin.vue'),
                    meta: {
                        requiresAuth: false,  // 不需登入
                        title: '登入 - 會員中心',
                    }
                },
                {
                    path: 'home',
                    name: 'home', // 會員中心
                    component: () => import('../components/admin/UserInfo.vue'),
                    redirect: { name: 'account' },
                    meta: {
                        requiresAuth: true,  // 需登入
                        title: '會員中心',
                    },
                    children: [
                        {
                            path: 'account',
                            name: 'account',  // 展示資訊
                            component: () => import('../components/admin/UserInfoView.vue'),
                            meta: {
                                requiresAuth: true,  // 需登入
                                title: '主頁 - 會員中心',
                            },
                        },
                        {
                            path: 'account-modify',
                            name: 'account-modify',  // 修改資訊
                            component: () => import('../components/admin/UserInfoModify.vue'),
                            meta: {
                                requiresAuth: true,  // 需登入
                                title: '修改會員資訊 - 會員中心',
                            },
                        },
                    ]
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

// 路由守衛
router.beforeEach(async (to, from, next) => {

    // 修改網頁 title
    document.title = to.meta.title || "練習 DummyJSON";
    

    // 檢查頁面是否需登入 (fetch 版本)
    // #region
    // if ( to.meta.requiresAuth ) {
    //     console.log('檢查 token 狀態');

    //     const store = useLoginStore();  // Store
        
    //     // 使用 token 確認登入者身分
    //     /* providing token in bearer */
    //     fetch('https://dummyjson.com/auth/me', {
    //         method: 'GET',
    //         headers: {
    //             'Authorization': `Bearer ${sessionStorage.getItem("token")}`, 
    //         }, 
    //     })
    //     .then(res => {
    //         console.log(res.status, typeof res.status); // Will show you the status

    //         // 請求失敗
    //         // if (!res.ok) {
                
    //         // }

    //         return res.json();
    //     })
    //     .then(json => {
    //         console.log('-token 狀態', json);

    //         // token 不合法 or 過期
    //         if ( json.message && json.message == 'Token Expired!' ) {
    //             console.log('--token 過期, 更新 token');

    //             // 使用 refreshToken 去換一個新的 token 回來
    //             fetch('https://dummyjson.com/auth/refresh', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     refreshToken: sessionStorage.getItem("refreshToken"),
    //                     expiresInMins: 2, // optional, defaults to 60
    //                 })
    //             })
    //             .then(res => {
    //                 if (!res.ok) {
    //                     // throw new Error("HTTP status " + res.status);
    //                     console.log(`---refreshToken 因 ${res.status} 錯誤請求失敗, 返回登入頁`);

    //                     alert('登入逾時，請重新登入');
    //                     router.push('/admin/login/'); // 跳轉至登入頁
    //                 }

    //                 return res.json();
    //             })
    //             .then(json => {
    //                 console.log('---token 更新成功, 保持登入', json);

    //                 // 將登入資料存入 session
    //                 sessionStorage.setItem("refreshToken", json.refreshToken);
    //                 sessionStorage.setItem("token", json.token);

    //                 router.push('/admin/home/'); // 跳轉至主頁
    //             });

    //         } 

    //         // 不合法 token
    //         else if ( json.message && json.message == 'Invalid/Expired Token!' ) {
    //             console.log('--token 不合法, 返回登入頁');
                
    //             // token 過期
    //             if ( sessionStorage.getItem("refreshToken") ) {
    //                 alert('登入逾時，請重新登入');

    //             // 非法闖入
    //             } else {
    //                 alert('非法入侵，請登入系統方可瀏覽');
                    
    //             }

    //             router.push('/admin/login/'); // 跳轉至登入頁
    //         }

    //         // token 正常
    //         else {
    //             console.log('--token 正常');

    //             // 把資料存入 store (若無此動作, 則未從登入流程抵達頁面都將丟失 store 資料)
    //             store.user_name = `${json.firstName} ${json.lastName}`;
    //             next();
    //         }
    //     })
    //     .catch(error => {
    //         console.log('error', error);
    //         // console.error(error);

    //     });

        
    // } else {
    //     next();
    // }
    // #endregion

    const userStore = useUserStore();  // Store

    // 檢查頁面是否需登入 (axios 版本)
    // #region
    // if ( to.meta.requiresAuth ) {
    //     console.log('進入權限頁面');

    //     // 1. 檢查是否有 token
    //     let token = sessionStorage.getItem("token");

    //     // 有 token
    //     if ( token ) {
            
    //         // 檢查登入狀態
    //         await userStore.checkLoginStatus();

    //         next();
    //     }
    //     // 無 token
    //     else {
    //         alert('非法入侵，請登入系統方可瀏覽');
    //         router.push('/admin/login/'); // 跳轉至登入頁
    //     }
    // } else {
    //     next();
    // }
    // #endregion


    // 1. 檢查是否有 token
    let token = sessionStorage.getItem("token");

    // 有 token
    if ( token ) {
        
        // 檢查登入狀態
        await userStore.checkLoginStatus();

        next();
    }

    // 無 token
    else {

        // 後台 (一定要登入)
        if ( to.meta.requiresAuth ) {
            console.log('非法入侵，請登入系統方可瀏覽');
            alert('非法入侵，請登入系統方可瀏覽');
            router.push('/admin/login/'); // 跳轉至登入頁

        // 前台 (不一定要登入)
        } else {
            next();
        }
    }



    // next();
});

export default router