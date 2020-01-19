import { keywordIns, bookIns } from '../../utils/instanceModel.js';
import { paginationBev } from '../behaviors/pagination.js';

Component({
    behaviors: [paginationBev],
    /**
     * 组件的属性列表
     */
    properties: {
        more: {
            type: String,
            observer: 'loadMore'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyWords: [],
        hotWords: [],
        searching: false,
        q: '',
        loading: false,
        loadingCenter: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        loadMore () {
            if (!this.data.q || this.isLocked()) return;

            if (this.hasMore()) {
                this.locked();

                bookIns.search(this.getCurrentStart(), this.data.q).then(res => {
                    this.setMoreData(res.books);
                    this.unLocked();
                }, () => {
                    // 请求失败，解除死锁
                    this.unLocked();
                });
            }
        },

        onCancel (e) {
            // 清除原来请求到的数据
            this.initialize();
            this.triggerEvent('cancel', {});
        },

        onDelete (e) {
            // 清除原来请求到的数据
            this.initialize();
            this._closeResult();
        },

        onConfirm (e) {
            this._showResult();
            this._showLoadingCenter();

            const q = e.detail.value || e.detail.text;
            this.setData({
                q
            });

            bookIns.search(0, q).then(res => {
                this.setMoreData(res.books);
                this.setTotal(res.total);

                this._hideLoadingCenter();
            });
        },

        _hideLoadingCenter () {
            this.setData({
                loadingCenter: false
            })
        },

        _showLoadingCenter () {
            this.setData({
                loadingCenter: true
            })
        },

        _showResult () {
            this.setData({
                searching: true
            });
        },

        _closeResult () {
            this.setData({
                searching: false,
                q: ''
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
