<template>

    <div class="child">
        <h2>Child 組件</h2>

        <h4>父組件傳來的資料:</h4>
        <ul>
            <li><code>props.data</code> {{ props.data }}</li>
            <!-- <li>props.modelValue: {{ props.modelValue }}</li> -->
            <li><code>v-model</code> <input type="text" v-model="model"></li>
            <li><code>v-model:c</code> <input type="text" v-model="color"></li>
        </ul>

        <button @click="setNumber(10)">設定數字為10</button>
        
        <!-- <button @click="handleChange('World')">修改姓名為World</button> -->

        <button @click="update">修改姓名</button>

        <input type="text" v-model="refTitle">
        
    </div>
    

</template>

<script setup>
import { ref } from 'vue';



// 接受父組件的 v-model
// defineModel() 返回一個 ref (Vue3.4+ 的語法糖)
const model = defineModel();      // 接收匿名 model
const color = defineModel('c');   // 接收參數為 c 的 model

// 修改父組件的 v-model
function update() {
    model.value+='~';
}


// defineModel() 底層機制 (3.4+ 以前用的方法)
// v-model 會直接給元件定義 modelValue 以及 update:modelValue 事件，
// 如果要接收資料，使用 modelValue；
// 要監聽與傳遞，使用 update:modelValue

// 修改 v-model 的資料
// const handleChange = (newVal) => {
//     emits('update:modelValue', newVal)
// }



// 接收父組件的資料
const props = defineProps({
    data: Number,
    // modelValue: String,  // 接收 v-model 的資料
});



// 接收父組件的事件
// defineEmits 返回一个等同于 $emit 方法的 emit 函数。
// 它可以被用于在组件的 <script setup> 中抛出事件，因为此处无法直接访问 $emit：
const emits = defineEmits([
    'eventIncrement',
    // 'update:modelValue',  // 接收 v-model 的資料的事件
]);

// 定義方法 (無須 return, 可直接於模版使用)
function setNumber(value) {
    // 通知父組件修改資料
    emits('eventIncrement', value); // defineEmits 返回的函數
}





const refTitle = ref('子組件數據');
/* 使用了 <script setup> 的组件是默认私有的：
    一个父组件无法访问到一个使用了 <script setup> 的子组件中的任何东西，
    除非子组件在其中通过 defineExpose 宏显式暴露：*/
// Compiler macros (编译器宏), such as defineExpose, don't need to be imported
defineExpose({
    refTitle,
})



</script>

<style>
.child {
    background-color: lightgoldenrodyellow;
    padding: 20px;
    margin-top: 30px;
}
</style>