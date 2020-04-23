import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-stressperson/station/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id,focusType) => {
  return request({
    url: '/api/blade-stressperson/station/detail',
    method: 'get',
    params: {
      id,
      focusType
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-stressperson/station/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row,focusType) => {
  return request({
    url: '/api/blade-stressperson/station/submit',
    method: 'post',
    data: row,
    params: {
      focusType
    }
  })
}

export const update = (row,focusType) => {
  return request({
    url: '/api/blade-stressperson/station/submit',
    method: 'post',
    data: row,
    params: {
      focusType
    }
  })
}

