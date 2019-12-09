/*
 * @author yosezheng
 * @description floating拖拽组件
 * 该组件必须接受area-class参数，为一个class类名，该class设置宽高即可
 * 由于小程序右滑事件无法阻止，所以建议将floating定位在页面右侧，这样引导用户一直为左滑操作
 * 该组件的x轴位置为最初设置的位置，不管如何拖动最终会回归到该X轴的渲染结果值上，这也是根据重构开发习惯设计的组件
 */

Component({
    options: {
        multipleSlots: true,
        // pureDataPattern: /^_/ 目前使用的版本不支持纯数据字段
    },
    externalClasses: [
        'area-class'
    ],


    lifetimes: {
        ready () {
            this._getBounding();
        }
    },

    /**
     * 组件的属性列表
     */
    properties: {
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        x: 0,
        y: 0,
        top: 0,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _getBounding(type) {
            const query = this.createSelectorQuery();
            query.select('#floating').boundingClientRect();

            query.exec(res => {
                let { top } = res[0]; // 获取floating节点位置信息

                this.setData({
                    top: ~~top
                })
            });
        },

        onTouchEnd (e) {
            const query = this.createSelectorQuery();
            query.select('#floating').boundingClientRect();

            // 执行所有获取节点信息请求
            query.exec(res => {
                let node = res[0];
                let {top} = node; // 获取当前floating节点位置信息

                // 两次setData是因为movable-view使用setData设置的y值有问题，第一次总是会拿原来的值直接代入，具体原因不详
                this.setData({
                    x: this.data.x,
                    y: ~~top - this.data.top
                });

                this.setData({
                    x: this.data.x,
                    y: ~~top - this.data.top
                });
            });

            return false;
        }
    },


})


/*
理想情况：
floating由组件样式控制大小及其位置，实例化时获取其绘制区域进行纪录，并计算真实渲染纪录转化为x与y的值，清空传入样式类名

方案失败纪录：
假设需要将floating在页面中进行居中，那么需要在外部样式中设置top与right的值
然而一旦外部设置了该值后，组件内部无法对其清除，导致floating松手后总会运动当前位置加上top与right的值

*/