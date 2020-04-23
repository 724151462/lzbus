import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-goods/goods/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id,contrabandType) => {
  return request({
    url: '/api/blade-goods/goods/detail',
    method: 'get',
    params: {
      id,
      contrabandType
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-goods/goods/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row,contrabandType) => {
  return request({
    url: '/api/blade-goods/goods/submit',
    method: 'post',
    data: row,
    params: {
      contrabandType
    }
  })
}

export const update = (row,contrabandType) => {
  return request({
    url: '/api/blade-goods/goods/submit',
    method: 'post',
    data: row,
    params: {
      contrabandType
    }
  })
}

