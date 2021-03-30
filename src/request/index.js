const config = {
    // 接口的根路径
    // baseUrl: 'http://127.0.0.1:5000/api',// https://m.yunhuiyuan.cn
    baseUrl: 'http://192.168.1.12:5000/api',// https://m.yunhuiyuan.cn
    // 超时时间
    timeout: 150000,
    // 设置请求的 header
    headers: {
        'Content-Type': 'application/json',
    },
    // 自定义请求拦截器（模拟axios）
    interceptors: {
        // 请求拦截
        request(configs) {
            let token = mpvue.getStorageSync('token')
            if (token) {
                configs.headers['Authorization'] = "Bearer " + token
            }
            return configs
        },
        // 响应拦截
        response(wxRes) {
            let {
                data: { data, code },
            } = wxRes;
            if (code === 200) {
                return data
            } else {
                return false
            }
        }
    }
}


const http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            // 拦截请求，这里可以进行自定义的配置
            let configs = Object.assign(config, { url, ...params });
            let {
                baseUrl,
                headers,
                url: configsUrl,
                params: configsParams
            } = config.interceptors.request(configs);
            mpvue.request({
                url: baseUrl + configsUrl,
                data: configsParams,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: headers,
                success: function (wxRes) {
                    let configsRes = config.interceptors.response(wxRes);
                    if (configsRes) {
                        resolve(configsRes);
                    } else {
                        reject(wxRes.data.data);//请求失败
                    }
                },
                fail: function (error) {
                    if (error.response) {
                        if (error.response.config.headers.withoutLogin) {
                            reject(error)
                        }
                        switch (error.response.status) {
                            case 401:
                                // 返回 401 清除token信息并跳转到登录页面
                                mpvue.clearStorageSync()
                                break
                            case 403:
                                // 返回 401 清除token信息并跳转到登录页面
                                mpvue.clearStorageSync()
                                break
                        }
                    }
                    reject(error.response || error);//请求失败
                }
            })
        })
    },
    post(url, datas) {
        return new Promise((resolve, reject) => {
            // 拦截请求，这里可以进行自定义的配置
            let configs = Object.assign(config, { url, datas });
            let {
                baseUrl,
                headers,
                url: configsUrl,
                datas: configsDatas
            } = config.interceptors.request(configs);
            mpvue.request({
                url: baseUrl + configsUrl,
                data: configsDatas,
                method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: headers, // 设置请求的 header
                success: function (wxRes) {
                    let configsRes = config.interceptors.response(wxRes);
                    if (configsRes) {
                        resolve(configsRes);
                    } else {
                        reject(wxRes.data.data);//请求失败
                    }
                },
                fail: function (error) {
                    if (error.response) {
                        if (error.response.config.headers.withoutLogin) {
                            reject(error)
                        }
                        switch (error.response.status) {
                            case 401:
                                // 返回 401 清除token信息并跳转到登录页面
                                mpvue.clearStorageSync()
                                break
                            case 403:
                                // 返回 401 清除token信息并跳转到登录页面
                                mpvue.clearStorageSync()
                                break
                        }
                    }
                    reject(error.response || error);//请求失败
                }
            })
        })
    },
    put(url, datas) {
        return new Promise((resolve, reject) => {
            // 拦截请求，这里可以进行自定义的配置
            let configs = Object.assign(config, { url, datas });
            let {
                baseUrl,
                headers,
                url: configsUrl,
                datas: configsDatas
            } = config.interceptors.request(configs);
            mpvue.request({
                url: baseUrl + configsUrl,
                data: configsDatas,
                method: 'PUT', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: headers, // 设置请求的 header
                success: function (wxRes) {
                    let configsRes = config.interceptors.response(wxRes);
                    if (configsRes) {
                        resolve(configsRes);
                    } else {
                        reject(wxRes.data.data);//请求失败
                    }
                },
                fail: function (error) {
                    if (error.response) {
                        if (error.response.config.headers.withoutLogin) {
                            reject(error)
                        }
                        switch (error.response.status) {
                            case 401:
                                // 返回 401 清除token信息并跳转到登录页面
                                mpvue.clearStorageSync()
                                break
                            case 403:
                                // 返回 401 清除token信息并跳转到登录页面
                                mpvue.clearStorageSync()
                                break
                        }
                    }
                    reject(error.response || error);//请求失败
                }
            })
        })
    }
}

export default http;//暴露出来供其他文件引用