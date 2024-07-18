// [Web] 以 axios 實踐前端 refresh token 機制
// https://dotblogs.com.tw/wasichris/2020/10/25/223728#google_vignette

import axios from 'axios'

/* 
  axios 攔截器 執行時機:
    1. 當使用 axios 請求 (Request) 時, AJAX Request 攔截器 會搶先執行
    2. 當 axios 回應 (Response) 後, AJAX Response 攔截器 會搶先執行
*/


// 全局設定 AJAX Request 攔截器 (interceptor)
axios.interceptors.request.use(async function (config) {
  console.log('axios Request 攔截器 成功');
  return config
}, function (error) {
  console.log('axios Request 攔截器 失敗');
  return Promise.reject(error)
})

// 全局設定 AJAX Response 攔截器 (interceptor)
axios.interceptors.response.use(function (response) {
  console.log('axios Response 攔截器 成功');
  return response
}, function (error) {
  console.log('axios Response 攔截器 失敗');
  if (error.response) {

    // server responded status code falls out of the range of 2xx
    switch (error.response.status) {
      // 400 (Bad Request)
      case 400:
        const { message } = error.response.data
        // alert(`${error.response.status}: ${message || '資料錯誤'}。`)
        console.log(`${error.response.status}: ${message || '資料錯誤'}。`);

        break

      // 401 (Unauthorized)
      case 401:
        /*
          可能得到 401 狀態的情境:
            1. token 過期, 需要用 refreshToken 去換一個新的 token 回來
            2. refreshToken 過期, 導回登入頁
            3. 非法進入授權頁面, 導回登入頁
        */

        // 當不是 refresh token 作業發生 401 才需要更新 access token 並重發
        // 如果是就略過此刷新 access token 作業，直接不處理(因為 catch 已經攔截處理更新失敗的情況了)
        const refreshTokenUrl = `https://dummyjson.com/auth/refresh`;
        const refreshToken = sessionStorage.getItem("refreshToken");
        
        // 情境 1 或 情境 3
        if (error.config.url !== refreshTokenUrl) {
          // 原始 request 資訊
          const originalRequest = error.config

          // 依據 refresh_token 刷新 access_token 並重發 request
          return axios
            .post(refreshTokenUrl,{
              refreshToken: refreshToken,
              expiresInMins: 2, // optional, defaults to 60
            })
            .then((response) => {
              // [更新 access_token 成功]
              console.log('更新 access_token 成功', response);

              // 刷新 storage (其他呼叫 api 的地方都會從此處取得新 access_token)
              sessionStorage.setItem("token", response.data.token);
              sessionStorage.setItem("refreshToken", response.data.refreshToken);

              // 刷新原始 request 的 access_token
              originalRequest.headers.Authorization = 'Bearer ' + response.data.token

              // 重送 request (with new access_token)
              return axios(originalRequest)
            })
            .catch((err) => {
              // [更新 access_token 失敗] ( e.g. refresh_token 過期無效)
              console.log('更新 access_token 失敗', err);

              sessionStorage.clear();
              alert(`${err.response.status}: 作業逾時或無相關使用授權，請重新登入`);
              window.location.href = '/admin/login/'
              return Promise.reject(error)
            })
        }
        
        break

      // 404 (Not Found)
      case 404:
        alert(`${error.response.status}: 資料來源不存在`)
        break

      // 500 (Internal Server Error)
      case 500:
        alert(`${error.response.status}: 內部系統發生錯誤，請稍後再試`)
        break

      default:
        alert(`${error.response.status}: 系統維護中，造成您的不便，敬請見諒。`)
        break
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    if (error.code === 'ECONNABORTED' && error.message && error.message.indexOf('timeout') !== -1) {
      // request time out will be here
      alert('網路連線逾時，請點「確認」鍵後繼續使用。')
    } else {
      // shutdonw api server
      alert('網路連線不穩定，請稍候再試')
    }
  }

  return Promise.reject(error)
})