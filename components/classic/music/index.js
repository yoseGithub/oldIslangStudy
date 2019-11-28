import { classicBeh } from '../classic-beh.js';

const mMgr = wx.getBackgroundAudioManager();

Component({
    behaviors: [classicBeh],
    /**
     * 组件的属性列表
     */
    properties: {
        src: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        isPlay: false
    },

    attached () {
        this._monitorSwitch();
    },
    
    observers: {
        // 由于是监听隐藏，所以非隐藏才是切换到music组件
        // 这里不能使用箭头函数，否则this指向会出问题
        'hidden': function (val) {
            if (!val) this._recoverStatus();
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onPlay () {
            if (!this.data.isPlay) {
                this.setData({ isPlay: true  });

                // https://developers.weixin.qq.com/miniprogram/dev/api/media/background-audio/BackgroundAudioManager.html
                // 文档指明，背景音乐的title为必填项
                mMgr.title = this.properties.content;
                mMgr.src = this.properties.src;
            } else {
                this.setData({ isPlay: false });
                mMgr.pause();
            }
        },

        // 音乐状态切换
        _recoverStatus () {
            /**
             * 没播放任何背景音乐时，backgroundAudioManager 为 undefined
             * 暂停或停止为 true
             * 播放音乐时为 false
             */

            // 当前播放音乐与期刊音乐一致，并且背景音乐没被停止，则需要设置为播放中，其余均为可播放
            // 视频中的做法是直接判断 mMgr 为 true，则说没音乐在播放，可亲测这个结果完全不对
            const isCurrentPlayingCpt = (mMgr.src === this.properties.src && mMgr.paused === false);
            this.setData({ isPlay: isCurrentPlayingCpt });
        },

        // 音乐总控开关
        _monitorSwitch () {
            mMgr.onPlay(() => this._recoverStatus());
            mMgr.onPause(() => this._recoverStatus());
            mMgr.onStop(() => this._recoverStatus());
            mMgr.onEnded(() => this._recoverStatus());
        }
    }
})
