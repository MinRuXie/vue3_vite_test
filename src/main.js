import { createApp } from 'vue'
import App from './App.vue'
// import './index.css'

// 匯入 pinia
import { createPinia } from 'pinia';

// 匯入 router
import router from './router/index.js';

// 匯入 Bootstrap 5
// https://hackmd.io/@chinggo/rkyqvjGtd
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

// 匯入 AJAX Request 攔截器
import './hook/useToken.js';

// 全局設定 AJAX Request 攔截器 (interceptor)
axios.interceptors.request.use(async function (config) {
    const token = sessionStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
  
    return config
}, function (error) {
    return Promise.reject(error)
})


// 創建 pinia 實例
const pinia = createPinia();

// 創建 app 實例
const app = createApp(App);


app.use(pinia);     // 使用 pinia
app.use(router);    // 使用 router
app.mount('#app');  // 掛載 app



// createApp(App).mount('#app')