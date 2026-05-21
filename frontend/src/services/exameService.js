import api from './api'

export const exameService = {
  listar: (params) => api.get('/exames', { params }),
  listarPorGestante: (gestanteId) => api.get(`/exames?gestanteId=${gestanteId}`),
  obter: (id) => api.get(`/exames/${id}`),
  criar: (data) => api.post('/exames', data),
  atualizar: (id, data) => api.put(`/exames/${id}`, data),
  remover: (id) => api.delete(`/exames/${id}`),
}
