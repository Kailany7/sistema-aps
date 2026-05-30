import api from './api'

export const gestanteService = {
  listar: (params) => api.get('/gestantes', { params }),
  obter: (id) => api.get(`/gestantes/${id}`),
  criar: (data) => api.post('/gestantes', data),
  atualizar: (id, data) => api.put(`/gestantes/${id}`, data),
  remover: (id) => api.delete(`/gestantes/${id}`),
}
