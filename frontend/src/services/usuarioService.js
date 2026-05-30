import api from './api'

export const usuarioService = {
  login: (login, senha) => api.post('/auth/login', { login, senha }),
  perfil: () => api.get('/auth/perfil'),
  listar: (params) => api.get('/usuarios', { params }),
  criar: (data) => api.post('/usuarios', data),
  atualizar: (id, data) => api.put(`/usuarios/${id}`, data),
  remover: (id) => api.delete(`/usuarios/${id}`),
}
