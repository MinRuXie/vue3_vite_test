# Vue3 Vite 串 DummyJSON 練習
* https://dummyjson.com/


## 頁面
* 會員中心
    * 登入 & 登出 & 權限頁面控制 (工時預估5天)
        1. 登入：輸入 "帳號" & "密碼" 取得 "token" & "refreshToken"，並存在 sessionStorage。
        2. 登入逾時："token" 過期，使用 "refreshToken" 去換一組新的 "token" & "refreshToken"。
        3. 登出：清除 sessionStorage 的資料。
        4. 權限頁面控制：未登入時不能瀏覽頁面。
    * 會員中心主頁
        * 列出使用者資訊
        * 修改資訊