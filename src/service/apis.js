import Taro from '@tarojs/taro'
import store from './store'

// 获取openid
export const getOpenId = (body = {}) => {
    return new Promise(resolve => {
        Taro.login({
            success: res => {
                Taro.request({
                    url: `https://mp.bdxmx.com/auth/${res.code}/login`,
                    method: 'POST',
                    data: body,
                    success: res => resolve(res.data),
                })
            },
        })
    })
}

// 获取老师列表
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%AB%AF%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#2-%E8%8E%B7%E5%8F%96%E6%89%80%E6%9C%89%E8%80%81%E5%B8%88
export const getTeacherList = (body = {page: 1, row: 99999}) => {
    return new Promise(resolve => {
        Taro.request({
            url: store.get('host') + '/api/mp/getTeacherList',
            method: 'POST',
            data: body,
            success: res => resolve(res.data),
        })
    })
}

// 绑定老师
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%AB%AF%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#3-%E7%BB%91%E5%AE%9A%E8%80%81%E5%B8%88
export const bindTeacher = (body = {}) => {
    return new Promise(resolve => {
        Taro.request({
            url: store.get('host') + '/api/mp/bindTeacher',
            method: 'POST',
            data: body,
            success: res => resolve(res.data),
        })
    })
}

// 获取学生信息
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E5%B0%8F%E7%A8%8B%E5%BA%8F%E7%AB%AF%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md#1-%E8%8E%B7%E5%8F%96%E5%AD%A6%E7%94%9F%E4%BF%A1%E6%81%AF
export const getStudentByOpenid = (params = '') => {
    return new Promise(resolve => {
        Taro.request({
            url: store.get('host') + '/api/mp/getStudentByOpenid/' + params,
            method: 'GET',
            success: res => resolve(res.data),
        })
    })
}

// 获取试卷列表 (不传 学生id 返回随机列表)
export const getPapers = (params = '') => {
    return new Promise(resolve => {
        Taro.request({
            url: store.get('host') + '/api/mp/getPapers/' + params,
            method: 'GET',
            success: res => resolve(res.data),
        })
    })
}

// 获取试卷
// https://github.com/lqj701/bdxmx-miniprogram/tree/master/doc#5-%E8%8E%B7%E5%8F%96%E8%AF%95%E5%8D%B7%E6%8E%A5%E5%8F%A3
export const getPaper = (body = {}) => {
    return new Promise(resolve => {
        Taro.request({
            url: 'https://api.bdxmx.com/api/paper/get',
            method: 'POST',
            data: body,
            success: res => resolve(res.data),
        })
    })
}

// 提交试卷
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E5%AD%A6%E7%94%9F%E7%AD%94%E5%8D%B7%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3(mp%E7%AB%AF).md#4-%E4%BF%9D%E5%AD%98%E7%AD%94%E5%8D%B7
export const submitPaper = (body = {}) => {
    return new Promise(resolve => {
        Taro.request({
            url: 'https://api.bdxmx.com/api/mp/saveAnswerSheet',
            method: 'POST',
            data: body,
            success: res => resolve(res.data),
        })
    })
}

// 获取自己的答卷列表
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E5%AD%A6%E7%94%9F%E7%AD%94%E5%8D%B7%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3(mp%E7%AB%AF).md#2-%E8%8E%B7%E5%8F%96%E8%87%AA%E5%B7%B1%E7%9A%84%E7%AD%94%E5%8D%B7%E5%88%97%E8%A1%A8
export const getAnswerSheets = (params = {}) => {
    return new Promise(resolve => {
        Taro.request({
            url: `https://api.bdxmx.com/api/mp/getAnswerSheets/${params}`,
            method: 'GET',
            success: res => resolve(res.data),
        })
    })
}

// 获取答卷详情
// https://github.com/lqj701/bdxmx-miniprogram/blob/master/doc/%E5%AD%A6%E7%94%9F%E7%AD%94%E5%8D%B7%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3(mp%E7%AB%AF).md#3-%E8%8E%B7%E5%8F%96%E7%AD%94%E5%8D%B7%E8%AF%A6%E6%83%85
export const getAnswerSheet = (params = {}) => {
    return new Promise(resolve => {
        Taro.request({
            url: `https://api.bdxmx.com/api/mp/getAnswerSheet/${params}`,
            method: 'GET',
            success: res => resolve(res.data),
        })
    })
}

// 获取试题
export const getQuestion = (params = {}) => {
    return new Promise(resolve => {
        Taro.request({
            url: `https://api.bdxmx.com/api/mp/getQuestion/${params}`,
            method: 'GET',
            success: res => resolve(res.data),
        })
    })
}

export const setInfo = (body = {}) => {
    return new Promise(resolve => {
        Taro.request({
            url: 'https://api.bdxmx.com/api/mp/saveStudent',
            method: 'POST',
            data: body,
            success: res => resolve(res.data),
        })
    })
}
