import { keywordIns, bookIns } from '../../utils/instanceModel.js';

Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        dataArray: [],
        searching: false,
        q: ''
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onCancel (e) {
            this.triggerEvent('cancel', {});
        },

        onDelete (e) {
            this.setData({
                searching: false
            })
        },

        onConfirm (e) {
            this.setData({
                searching: true
            });

            const q = e.detail.value || e.detail.text;

            bookIns.search(0, q).then(res => {
                this.setData({
                    dataArray: res.books,
                    q
                });

                console.log(res.books.length)
                // 仅保存有效信息
                if (res.books.length) {
                    keywordIns.addToHistory(q);
                }
            });
        }
    },

    attached () {
        this.setData({
            historyWords: keywordIns.getHistory()
        });

        keywordIns.getHot().then(res => {
            this.setData({
                hotWords: res.hot
            })
        });
    }
})
