import { useState, useCallback } from 'react'

export function useForm(initialValues) {
  const [form, setForm] = useState(initialValues)
  const [touched, setTouched] = useState({})

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }, [])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }, [])

  const cls = useCallback((name, baseClass = 'form-control') => {
    const invalid = touched[name] && !form[name] ? 'is-invalid' : ''
    return invalid ? `${baseClass} ${invalid}` : baseClass
  }, [touched, form])

  const selCls = useCallback((name, baseClass = 'form-select') => {
    const invalid = touched[name] && !form[name] ? 'is-invalid' : ''
    return invalid ? `${baseClass} ${invalid}` : baseClass
  }, [touched, form])

  const reset = useCallback(() => {
    setForm(initialValues)
    setTouched({})
  }, [initialValues])

  const isInvalid = useCallback(() => {
    const required = Object.keys(initialValues)
    const empty = required.filter((key) => !form[key])
    return empty.length > 0
  }, [initialValues, form])

  return { form, setForm, touched, handleChange, handleBlur, cls, selCls, reset, isInvalid }
}
