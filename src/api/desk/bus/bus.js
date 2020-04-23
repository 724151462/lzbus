import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-bus/bus/list',
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
    url: '/api/blade-bus/bus/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (id) => {
  return request({
    url: '/api/blade-bus/bus/remove',
    method: 'post',
    params: {
      id,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-bus/bus/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-bus/bus/submit',
    method: 'post',
    data: row
  })
}
export const  getDriverSelect = (companyId) => {
  return request({
    url:  "/api/blade-bus/bus/driver",
    method: 'get',
    params: {
      companyId
    }
  })
}

export const  getSecuritySelect = (companyId) => {
  return request({
    url: '/api/blade-bus/bus/security',
    method: 'get',
    params: {
      companyId
    }
  })
}

