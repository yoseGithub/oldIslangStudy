Component({
    /**
     * 组件的属性列表
     */
    properties: {
        like: {
            type: Boolean
        },
        count: {
            type: Number
        }
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
        onLike (e) {
            let { like, count } = this.properties;

            // 由于设置的时候，上面的like设置跟下面的count是同步的，所以此时like还是false，因此false的时候反而才是需要增加数量的
            this.setData({
                like: !like,
                count: count += (like ? -1 : 1)
            })

            // 激活
            let behavior = this.properties.like ? 'like' : 'cancel';
            this.triggerEvent('like', { behavior }, {});
        }
    }
})
