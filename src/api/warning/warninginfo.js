import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-warning-info/warninginfo/page',
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
    url: '/api/blade-warning-info/warninginfo/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-warning-info/warninginfo/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-warning-info/warninginfo/save',
    method: 'post',
    data: row
  })
}

export const submitRemark = (row) => {
  return request({
    url: '/api/blade-warning-info/warninginfo/submitRemark',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-warning-info/warninginfo/submit',
    method: 'post',
    data: row
  })
}

