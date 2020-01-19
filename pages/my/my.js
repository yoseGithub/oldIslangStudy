import {
  ClassicModel
} from '../../models/classic.js'
import {
  BookModel
} from '../../models/book.js'

let classicModel = new ClassicModel()
let bookModel = new BookModel()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        
    },

    // 用户点击授权按钮
    getUserInfo (event) {
        console.log(event);
    },

    // 页面加载，获取用户授权数据
    onLoad (options) {
        wx.getUserInfo({
            success: data => {
                console.log(data);
            }
        })
    }
})