import api from './api'

export const unidadeService = {
  listar: () => api.get('/unidades'),
}
