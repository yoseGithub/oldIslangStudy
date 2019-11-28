// components/tag/index.js
Component({
    options: {
        multipleSlots: true, // 即是是单插槽也需要启动多插槽这个属性
        // 父组件样式穿透子组件
        // 组件样式隔离文档：https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/wxml-wxss.html
        // 美[ˌaɪsəˈleɪʃn]
        // styleIsolation: 'apply-shared'
    },
    // 外部样式传递，推荐做法，而不是上面那种hack的侵入式做法
    // 美[ɪkˈstɜːrnl]
    externalClasses: [
        'tag-class'
    ],
    /**
     * 组件的属性列表
     */
    properties: {
        text: String
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onTap (e) {
            this.triggerEvent('tapping', {
                text: this.properties.text
            })
        }
    }
})
