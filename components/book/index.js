// components/book/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        book: Object
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
            const bid = this.properties.book.id;
            /**
             * 组件中直接写固定数据的做法优缺点
             * 降低了组件的通用性
             * 非常方便
             * 取舍：服务于当前的项目 项目组件，则采取方便快捷为准
             */
            wx.navigateTo({
                url: `/pages/book-detail/book-detail?bid=${bid}`,
            })
        }
    }
})
