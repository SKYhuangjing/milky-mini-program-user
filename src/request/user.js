/*
 * @Author: Yin Xiang Zheng
 * @LastEditors: Yin Xiang Zheng
 * @LastEditTime: 2021-01-06 17:05:42
 */
import request from './index'
export function loginByPass(data) {
    return request.post('/login/local', data)
}
