import config from '../config';
 
class HTTP {
    request (params) {
        wx.request({
            url: config.api_base_url + params.url,
            method: params.method || 'GET',
            data: params.data,
            header: {
                'content-type': 'application/json',
                'appKey': config.appkey
            },
            success: (res) => {
                let code = res.statusCode.toString();
 
                // 以前是使用 code.chatAt(0) == 2，es6新方法 str.startWith
                if (code.startsWith(2)) {
                    params.success && params.success(res.data);
                } else {
                    this._show_error(res.data);
                }
            },
            fail: (err) => {
                this._show_error(1);
            }
        })
    }
 
    _show_error ({error_code}) {
        if (!error_code) error_code = 1;
 
        wx.showToast({
            title: config.err_tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}
 
export default HTTP;