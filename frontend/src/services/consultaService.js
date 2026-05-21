import api from './api'

export const consultaService = {
  listar: (params) => api.get('/consultas', { params }),
  listarPorGestante: (gestanteId) => api.get(`/consultas?gestanteId=${gestanteId}`),
  obter: (id) => api.get(`/consultas/${id}`),
  criar: (data) => api.post('/consultas', data),
  atualizar: (id, data) => api.put(`/consultas/${id}`, data),
  remover: (id) => api.delete(`/consultas/${id}`),
}
