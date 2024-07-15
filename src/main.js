import { createApp } from 'vue'

// 匯入 pinia
import { createPinia } from 'pinia'

import App from './App.vue'
// import './index.css'

import router from './router/index.js'

// 匯入 Bootstrap 5
// https://hackmd.io/@chinggo/rkyqvjGtd
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";


// 創建 pinia 實例
const pinia = createPinia();

// 創建 app 實例
const app = createApp(App);


app.use(pinia);     // 使用 pinia
app.use(router);    // 使用 router
app.mount('#app');  // 掛載 app



// createApp(App).mount('#app')