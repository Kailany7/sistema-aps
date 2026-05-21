export function extractError(error) {
  if (error.response?.data?.message) return error.response.data.message
  if (error.response?.data?.error) return error.response.data.error
  if (error.message) return error.message
  return 'Erro inesperado. Tente novamente.'
}

export function extractErrors(error) {
  if (error.response?.data?.errors) return error.response.data.errors
  return []
}
