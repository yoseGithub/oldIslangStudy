// import regeneratorRuntime from '../../utils/regenerator.js';
// const moment = require('../../utils/monent');
// https://www.jianshu.com/p/e622dee9de99

import { classicIns, likeIns } from "../../utils/instanceModel.js";

Page({
    /**
     * 页面的初始数据
     */
    data: {
        classic: null,
        latest: true,
        first: false,
        likeCount: 0, // 点赞数
        likeStatus: false // 用户点赞状态
    },

    onLike (e) {
        let classic = this.data.classic,
            behavior = e.detail.behavior, // like组件中发送出来的behavior
            { id, type } = classic;

        likeIns.toggleLike(behavior, id, type);
    },

    onNext (e) {
        this._updateClassic('next');
    },

    onPrevious(e) {
        this._updateClassic('previous');
    },

    _updateClassic (nextOrPrevious) {
        let index = this.data.classic.index;

        classicIns.getClassic(index, nextOrPrevious, (res) => {
            this._getLikeStatus(res.id, res.type);

            this.setData({
                classic: res,
                latest: classicIns.isLatest(res.index),
                first: classicIns.isFirst(res.index)
            })
        });
    },

    _getLikeStatus (artID, category) {
        likeIns.getClassicLikeStatus(artID, category, res => {
            this.setData({
                likeStatus: res.like_status,
                likeCount: res.fav_nums
            });
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        classicIns.getLatest(res => {
            let { like_status: likeStatus, fav_nums: likeCount } = res;

            this.setData({
                classic: res,
                likeStatus,
                likeCount
            });
        });
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
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})