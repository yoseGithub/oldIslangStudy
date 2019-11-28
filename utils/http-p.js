import config from '../config';
 
class HTTP {
    // 解构赋值，参数形象
    request({url, data = {}, method = 'GET'}) {
        return new Promise((resolve, reject) => {
            this._request(url, resolve, reject, data, method);
        })
    }

    _request(url, resolve, reject, data = {}, method ='GET') {
        wx.request({
            url: config.api_base_url + url,
            method,
            data,
            header: {
                'content-type': 'application/json',
                'appKey': config.appkey
            },
            success: (res) => {
                const code = res.statusCode.toString();
 
                // 以前是使用 code.chatAt(0) == 2，es6新方法 str.startWith
                if (code.startsWith(2)) {
                    resolve(res.data);
                } else {
                    reject();
                    this._show_error(res.data);
                }
            },
            fail: (err) => {
                reject();
                this._show_error(1);
            }
        })
    }
 
    _show_error ({error_code}) {
        // 不存在错误码
        if (!error_code) error_code = 1;
        // 如果存在未定义的错误码，则报默认错误
        const tip = config.err_tips[error_code];
 
        wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}
 
export default HTTP;