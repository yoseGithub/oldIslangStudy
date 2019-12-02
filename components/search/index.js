import {keywordIns} from '../../utils/instanceModel.js';
console.log(keywordIns);

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
        hotWords: []
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onCancel (e) {
            this.triggerEvent('cancel', {});
        },
        onConfirm (e) {
            const word = e.detail.value;
            keywordIns.addToHistory(word);
        }
    },

    attached () {
        const historyWords = keywordIns.getHistory();
        const hotWords = keywordIns.getHot();
        this.setData({
            historyWords
        });

        hotWords.then(res => {
            this.setData({
                hotWords: res.hot
            })
        });
    }
})
