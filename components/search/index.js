import { keywordIns, bookIns } from '../../utils/instanceModel.js';

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        more: {
            type: String,
            observer: '_load_more'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        dataArray: [],
        searching: false,
        q: '',
        loading: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _load_more() {
            if (!this.data.q || this.data.loading) return;

            const length = this.data.dataArray.length;
            this.data.loading = true;

            bookIns.search(length, this.data.q).then(res => {
                const temArray = this.data.dataArray.concat(res.books);
                this.setData({
                    dataArray: temArray
                });
                this.data.loading = false;
            });
        },

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
