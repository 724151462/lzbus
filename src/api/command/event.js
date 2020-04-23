import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-event/event/list',
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
    url: '/api/blade-event/event/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-event/event/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-event/event/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-event/event/submit',
    method: 'post',
    data: row
  })
}
export const caseChange = (row) => {
  return request({
    url: '/api/blade-event/event/caseChange',
    method: 'post',
    data: row,
    params: {
    }
  })
}
