import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-stressperson/person/page',
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
    url: '/api/blade-stressperson/person/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-stressperson/person/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-stressperson/person/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-stressperson/person/submit',
    method: 'post',
    data: row
  })
}

export const getPrimarykey = () => {
  return request({
    url: '/api/blade-stressperson/person/getPrimarykey',
    method: 'post',
  })
}



