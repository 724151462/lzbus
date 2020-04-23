import request from '@/router/axios';

export const blackListAPI = (data, mock=false ) => {
  return request({
    url: mock == true ? 'http://localhost:36742/blacklist':'/api/',
    method: 'get',
    params: data
  })
}

export const personFenbuAPI = (data, mock=false ) => {
  return request({
    url: mock == true ? 'http://localhost:36742/personFenbu':'/api/',
    method: 'get',
    params: data
  })
}

export const personChuxingAPI = (data, mock=false ) => {
  return request({
    url: mock == true ? 'http://localhost:36742/personChuxing':'/api/',
    method: 'get',
    params: data
  })
}
