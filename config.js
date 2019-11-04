const config = {
    api_base_url: 'http://bl.7yue.pro/v1/',
    appkey: 'ezZt8wRIfZouIKVh',
    /* 请求错误码及对应提示 */
    err_tips: {
        1: '抱歉，出现了一个错误',
        0: 'OK, 成功',
        1000: '输入参数错误',
        1001: '输入的json格式不正确',
        1002: '找不到资源',
        1003: '未知错误',
        1004: '禁止访问',
        1005: '不正确的开发者key',
        1006: '服务器内部错误',
        2000: '你已经点过赞了',
        2001: '你还没点过赞',
        3000: '该期内容不存在'
    }
}

export default config;