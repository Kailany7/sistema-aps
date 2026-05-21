import api from './api'

export const encaminhamentoService = {
  listar: (params) => api.get('/referencias', { params }),
  obter: (id) => api.get(`/referencias/${id}`),
  criar: (data) => api.post('/referencias', data),
  atualizar: (id, data) => api.put(`/referencias/${id}`, data),
  remover: (id) => api.delete(`/referencias/${id}`),
}
