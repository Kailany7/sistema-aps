import api from './api'

export const riscoService = {
  listar: () => api.get('/riscos'),
}
