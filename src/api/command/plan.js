import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-command-plan/plan/page',
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
    url: '/api/blade-command-plan/plan/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-command-plan/plan/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-command-plan/plan/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-command-plan/plan/update',
    method: 'post',
    data: row
  })
}

export const reviewPlan = (planId) => {
  return request({
    url: '/api/blade-command-plan/plan/reviewplan',
    method: 'post',
    params: {
      planId,
    }
  })
}

export const deducePlan = (row) => {
  return request({
    url: '/api/blade-command-plan/plan/deduceplan',
    method: 'post',
    data: row
  })
}

