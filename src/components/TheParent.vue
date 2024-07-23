<template>
    <div class="parent">
        <h1>Parent 組件</h1>

        <ul>
            <li><code>data</code> {{ data }}</li>
            <li><code>name</code> {{ name }}</li>
            <li><code>color</code> {{ color }}</li>
        </ul>


        <button @click="increment">數字+1</button>
        <button @click="printChild">打印子組件數據</button>
        
        

        <TheChild 
            ref="refChild"
            :data="data"
            @eventIncrement="setNumber"

            v-model="name"
            v-model:c="color"
        />
    </div>
    
</template>

<script setup>
import { ref } from 'vue';

// 匯入組件 (無須註冊, 可直接於模版使用)
import TheChild from './TheChild.vue';

// 定義資料 (無須 return, 可直接於模版使用)
const data = ref(0);
const name = ref('hello');
const color = ref('red');

// 定義方法 (無須 return, 可直接於模版使用)
function increment() {
    data.value++;
}

function setNumber(value) {
    data.value = value;
}


// 子組件傳給父組件的資料
const refChild = ref(null);

function printChild() {
    // 子組件
    console.log('refChild.value', refChild.value);

    // 子組件對外暴露的資料
    console.log('refChild.value.refTitle', refChild.value.refTitle);
}



</script>

<style>
.parent {
    background-color: lightblue;
    padding: 20px;
}
</style>