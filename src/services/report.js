import request from '../utils/request';

export async function submitData(params) {
  return request('/api/save', {
    method: 'POST',
    isFormData: true,
    body: params,
  });
}
