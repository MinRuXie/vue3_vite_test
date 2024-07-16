# Vue3 Vite 串 DummyJSON 練習
* https://dummyjson.com/

## 參考
* [Vue 3 JWT Refresh Token with Axios example](https://github.com/bezkoder/vue-3-jwt-refresh-token)

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