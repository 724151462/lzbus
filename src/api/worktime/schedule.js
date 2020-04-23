import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-schedule/schedule/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getLazyList = (parentId, params) => {
  return request({
    url: '/api/blade-schedule/schedule/lazy-list',
    method: 'get',
    params: {
      ...params,
      parentId
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-schedule/schedule/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-schedule/schedule/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-schedule/schedule/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-schedule/schedule/submit',
    method: 'post',
    data: row
  })
}

