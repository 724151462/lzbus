import request from '@/router/axios';

// =====================全部路线===========================

export const busLinesAPI = () => {
    return request({
        url: '/api/blade-desk/busshow/nav-list',
        method: 'get'
    })
}

// =====================全部路线===========================

export const busTotalData = () => {
    return request({
        url: '/api/blade-desk/busshow/index-total',
        method: 'get'
    })
}

// =====================某公交id的所有车辆===========================

export const getCarsAPI = (data) => {
    return request({
        url: '/api/blade-desk/busshow/bus-list',
        method: 'get',
        params: data
    })
}

// =====================某具体公交id的车辆信息===========================

export const getRightCarInfoAPI = (data) => {
    return request({
        url: '/api/blade-desk/busshow/bus-staff',
        method: 'get',
        params: data
    })
}

// =====================某具体公交id的事件信息===========================

export const getCarCasesAPI = (data) => {
    return request({
        url: '/api/blade-desk/busshow/line-cases',
        method: 'get',
        params: data
    })
}

// =====================某具体公交id的历史事件信息===========================

export const getRightCarEventsAPI = (data) => {
    return request({
        url: '/api/blade-desk/busshow/line-events',
        method: 'get',
        params: data
    })
}