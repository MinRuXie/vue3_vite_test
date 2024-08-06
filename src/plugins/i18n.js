// 自定義 i18n 插件
// 一个插件可以是一个拥有 install() 方法的对象，也可以直接是一个安装函数本身

// 一个拥有 install() 方法的对象
export default {
    install: (app, options) => {
        // 在这里编写插件代码

        // 方法 1:
        // 注入一个全局可用的 $translate() 方法
        // app.config.globalProperties.$translate = (key) => {
        //     // 获取 `options` 对象的深层属性
        //     // 使用 `key` 作为索引
        //     return key.split('.').reduce((o, i) => {
        //         if (o) return o[i]
        //     }, options)
        // }

        // 方法 2:
        app.provide('i18n', options)
    }
}