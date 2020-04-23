import request from '@/router/axios';

export const getConPoliceList = (controlId) => {
  return request({
    url: '/api/blade-stressperson/controlpolice/page',
    method: 'get',
    params: {
      controlId
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-stressperson/controlpolice/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const removeConPolice = (ids) => {
  return request({
    url: '/api/blade-stressperson/controlpolice/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const conPoliceSave = (row) => {
  return request({
    url: '/api/blade-stressperson/controlpolice/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-stressperson/controlpolice/submit',
    method: 'post',
    data: row
  })
}

