# Vue3 Vite 串 DummyJSON 練習
* 資料來源：https://dummyjson.com/
* 表單驗證：https://vee-validate.logaretm.com/v4/
* Vue 狀態管理：https://pinia.vuejs.org/zh/
* 串接 API 工具：https://axios-http.com/
    * [Vue 3 JWT Refresh Token with Axios example](https://github.com/bezkoder/vue-3-jwt-refresh-token)
    * axios 攔截器：[[Web] 以 axios 實踐前端 refresh token 機制](https://dotblogs.com.tw/wasichris/2020/10/25/223728#google_vignette)
* Vue3 核心：https://cn.vuejs.org/
    * [一文看懂vue3中setup()和 ＜script setup＞＜script＞的区别](https://blog.csdn.net/u013505589/article/details/122718376)
    * [Vue3 如何用 defineModel 實作 props/ emit 的父子元件傳值，讓傳值變得更方便簡單](https://muki.tw/vmodel-definemodel-props-emit/#google_vignette)



## 頁面
* 會員中心
    * 登入 & 登出 & 路由守衛 (工時預估5天)
        1. 登入：輸入 "帳號" & "密碼" 取得 "token" & "refreshToken"，並存在 sessionStorage。
        2. 登出：清除 sessionStorage 的資料，跳轉登入頁。
        3. 路由守衛：
            1. 未登入時：跳轉登入頁。
            2. "token" 過期：使用 "refreshToken" 去換一組新的 "token" & "refreshToken"。
            3. "refreshToken"過期：跳轉登入頁。
    * 會員中心主頁
        * 列出使用者資訊
        * 修改資訊