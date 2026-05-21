import { useState, useCallback } from 'react'

export function useApi(apiFunc, immediate = false) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const execute = useCallback(async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const response = await apiFunc(...args)
      setData(response.data)
      return response.data
    } catch (err) {
      const msg = err.response?.data?.message || err.response?.data?.error || err.message || 'Erro inesperado'
      setError(msg)
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiFunc])

  const reset = useCallback(() => {
    setData(null)
    setError(null)
    setLoading(false)
  }, [])

  return { data, loading, error, execute, reset }
}
