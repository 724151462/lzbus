import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-desk/consumptionrecord/consumptiontotal?dateType=date',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

