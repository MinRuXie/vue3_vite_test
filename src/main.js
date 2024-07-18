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


// 匯入 axios
import axios from 'axios';
import VueAxios from 'vue-axios';  // 可以解決 RangeError: Maximum call stack size exceeded 錯誤

// 匯入 Axios 攔截器
import './hook/useAxiosInterceptors.js';




// 創建 pinia 實例
const pinia = createPinia();

// 創建 app 實例
const app = createApp(App);


app.use(VueAxios, axios);  // 使用 VueAxios, axios
app.use(pinia);     // 使用 pinia
app.use(router);    // 使用 router
app.mount('#app');  // 掛載 app



// createApp(App).mount('#app')