import request from '@/router/axios';

export const getRelPersonList = (personId) => {
  return request({
    url: '/api/blade-relationperson/personrelation/list',
    method: 'get',
    params: {
      personId
    }
  })
}

export const getRelPersonDetail = (id) => {
  return request({
    url: '/api/blade-relationperson/personrelation/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const removeRelPerson = (ids) => {
  return request({
    url: '/api/blade-relationperson/personrelation/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const addRelPerson = (row) => {
  return request({
    url: '/api/blade-relationperson/personrelation/submit',
    method: 'post',
    data: row
  })
}

export const updateRelPerson = (row) => {
  return request({
    url: '/api/blade-relationperson/personrelation/submit',
    method: 'post',
    data: row
  })
}

