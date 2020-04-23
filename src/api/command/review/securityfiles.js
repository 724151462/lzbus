import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-staff/staff/list',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id,staffType) => {
  return request({
    url: '/api/blade-staff/staff/detail',
    method: 'get',
    params: {
      id,
      staffType
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-staff/staff/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row,staffType) => {
  return request({
    url: '/api/blade-staff/staff/submit',
    method: 'post',
    data: row,
    params: {
      staffType,
    }
  })
}

export const update = (row,staffType) => {
  return request({
    url: '/api/blade-staff/staff/submit',
    method: 'post',
    data: row,
    params: {
      staffType,
    }
  })
}

export const check = (row) => {
  return request({
    url: '/api/blade-staff/staff/saveCheck',
    method: 'post',
    data: row,
    params: {
    }
  })
}
