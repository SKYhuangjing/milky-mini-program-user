/*
 * @Author: Yin Xiang Zheng
 * @LastEditors: Yin Xiang Zheng
 * @LastEditTime: 2021-03-15 15:22:36
 */
import request from './index'

export function getFlowList(params) {
    return request.get(`/flow/list`, { params });
}


export function updateFlowPublicity(id, data) {
    return request.put(`/flow/${id}/relatedDocuments/publicity`, data);
}