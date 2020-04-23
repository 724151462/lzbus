import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-stressperson/control/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-stressperson/control/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-stressperson/control/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-stressperson/control/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-stressperson/control/submit',
    method: 'post',
    data: row
  })
}


export const getPrimarykey = () => {
  return request({
    url: '/api/blade-stressperson/control/getPrimarykey',
    method: 'post',
  })
}

export const getCityLineSelect = (cityId) => {
  return request({
    url: '/api/blade-line/line/getCityLineSelect',
    method: 'get',
    params: {
      cityId
    }
  })
}

export const reviewControl = (controlId) => {
  return request({
    url: '/api/blade-stressperson/control/reviewControl',
    method: 'post',
    params: {
      controlId,
    }
  })
}




