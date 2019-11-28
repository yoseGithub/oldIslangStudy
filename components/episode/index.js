Component({
    /**
     * 组件的属性列表
     */
    properties: {
        index: String,
        pubdate: String
    },

    /* https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/observer.html，文档里说会比属性中的observer性能更高 */
    observers: {
        'pubdate': function (val) {
            // 兼容旧版小程序，初始化的时候也会执行进来，此时为空值，会导致下面的month为NaN，新版的没这个问题
            if (!val) return;

            let data = new Date(this.properties.pubdate);
            let year = data.getFullYear();
            let month = data.getMonth();

            this.setData({
                year,
                month: this.data.months[month]
            })
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        year: 0,
        month: '',
        months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
    },

    lifetimes: {
        attached () {
            // 在任何一个生命周期里都无法获取到传入进来的pubdate值
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        
    }
})
