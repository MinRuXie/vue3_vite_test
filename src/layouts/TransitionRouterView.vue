<template>

    <!-- 使用注意事項 -->

    <!-- 1. 內置組件嵌套順序不可改變 -->
    <!-- 2. 主要内容的組件模板只能包含一個根節點 -->

    <RouterView v-slot="{ Component }">
        <template v-if="Component">
            <Transition mode="out-in">

                <!-- 主要内容 -->
                <component :is="Component"></component>

            </Transition>
        </template>
    </RouterView>

</template>