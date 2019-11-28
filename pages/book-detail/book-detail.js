import { likeIns, bookIns } from "../../utils/instanceModel.js";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        comments: [],
        book: null,
        likeStatus: false,
        likeCount: 0,
        posting: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading();

        const bid = options.bid;
        const detail = bookIns.getDetail(bid);
        const likeStatus = bookIns.getLikeStatus(bid);
        const comments = bookIns.getComments(bid);

        // detail.then(res => {
        //     console.log(res)
        //     this.setData({
        //         book: res
        //     });
        // });

        // likeStatus.then(res => {
        //     console.log(res)
        //     this.setData({
        //         likeStatus: res.like_status,
        //         likeCount: res.fav_nums
        //     });
        // });

        // comments.then(res => {
        //     console.log(res)
        //     this.setData({
        //         comments: res.comments
        //     });
        // });

        Promise.all([detail, comments, likeStatus]).then(res => {
            this.setData({
                book: res[0],
                comments: res[1].comments,
                likeStatus: res[2].like_status,
                likeCount: res[2].fav_nums
            });

            wx.hideLoading();
        })
    }, 
    
    onLike(e) {
        let behavior = e.detail.behavior;
        likeIns.toggleLike(behavior, this.data.book.id, 400);
    },

    onFakePost (e) {
        this.setData({
            posting: true
        });
    },

    onCancel (e) {
        this.setData({
            posting: false
        });
    },

    onPost (e) {
        const comment = e.detail.text || e.detail.value;

        console.log(comment);

        if (comment.length > 12) {
            wx.showToast({
                title: '短评最多12个字',
                icon: 'none'
            });

            return;
        }

        bookIns.postComment(this.data.book.id, comment).then(() => {
            wx.showToast({
                title: '评论+1',
                icon: 'none'
            })

            this.data.comments.unshift({
                content: comment,
                nums: 1
            });

            this.setData({
                comments: this.data.comments,
                posting: false
            })
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