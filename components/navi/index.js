// components/navi/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: String,
        first: Boolean,
        lastest: Boolean
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
        onNext (e) {
            if (!this.properties.lastest) this.triggerEvent('next');
        },
        onPrevious(e) {
            if (!this.properties.first) this.triggerEvent('previous');
        }
    }
})
