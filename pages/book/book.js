import { bookIns } from "../../utils/instanceModel.js";
import { random } from '../../utils/common.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 纯粹callBack 回调地狱 剥夺函数return能力
        // promise 支持多个异步等待合并 依然需要回调，但不会剥夺函数的return能力，不需要层层传递callBack
        // async await
        books: [],
        searching: false,
        more: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        bookIns.getHotList().then(res => {
            this.setData({
                books: res
            });
        });
    },

    onSearching () {
        this.setData({
            searching: true
        })
    },

    onCancel() {
        this.setData({
            searching: false
        })
    },

    onReachBottom () {
        this.setData({
            more: random(16)
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})