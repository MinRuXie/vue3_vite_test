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


// 匯入 自定義 i18n插件
import i18nPlugin from './plugins/i18n';




// 創建 pinia 實例
const pinia = createPinia();

// 創建 app 實例
const app = createApp(App);


// 使用插件
app.use(VueAxios, axios);  // 使用 VueAxios, axios
app.use(pinia);     // 使用 pinia
app.use(router);    // 使用 router

// 使用自定義 i18n插件
app.use(i18nPlugin, {
    greetings: {
        hello: 'Bonjour!'
    }
})



// 安裝
app.mount('#app');  // 掛載 app
// createApp(App).mount('#app')