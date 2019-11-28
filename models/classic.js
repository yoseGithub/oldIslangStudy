import HTTP from "../utils/http.js";

class ClassicModel extends HTTP {
    getLatest(sCallBack) {
        this.request({
            url: 'classic/latest',
            success: (res) => {
                sCallBack(res);
                this._setLatestIndex(res.index);

                // 写入缓存，页面加载的首个请求不需要检查重复
                let key = this._getKey(res.index);
                wx,wx.setStorageSync(key, res);
            }
        });
    }

    getClassic (index, nextOrPrevious, sCallBack) {
        let currentIndex = nextOrPrevious === 'next' ? index + 1 : index - 1;
        let key = this._getKey(currentIndex);
        let classic = wx.getStorageSync(key);

        // 缓存中没有请求的目标期刊
        if (!classic) {
            this.request({
                url: `classic/${index}/${nextOrPrevious}`,
                success: (res) => {
                    // 将key写到小程序缓存里
                    wx.setStorageSync(this._getKey(res.index), res);
                    sCallBack(res);
                }
            });
        } else {
            sCallBack(classic);
        }
    }

    isFirst (index) {
        return index === 1;
    }

    isLatest (index) {
        let latestIndex = this._getLatestIndex();
        return index === latestIndex;
    }

    _setLatestIndex (index) {
        // 同步写入缓存 setStorage则为异步写入缓存
        wx.setStorageSync('latest', index);
    }

    _getLatestIndex () {
        let index = wx.getStorageSync('latest');
        return index;
    }

    _getKey (index) {
        return 'classic-' + index;
    }
}

export { ClassicModel };