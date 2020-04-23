import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-desk/consumptionrecord/list',
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
    url: '/api/blade-desk/consumptionrecord/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-desk/consumptionrecord/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-desk/consumptionrecord/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-desk/consumptionrecord/submit',
    method: 'post',
    data: row
  })
}

export const fileUpload = (importType, files) => {
  const formData = new FormData();
  formData.append('importType', importType);
  files.forEach(file => {
    formData.append('files', file);
  });
  return request({
    headers: {
      "Content-Type": "multipart/form-data"
    },
    url: '/api/blade-desk/consumptionrecord/file-upload',
    method: 'post',
    data: formData
  })
}

