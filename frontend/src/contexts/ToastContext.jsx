import { createContext, useContext, useState, useCallback } from 'react'

const ToastContext = createContext()

let toastId = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = 'danger', duration = 4000) => {
    const id = ++toastId
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), duration)
  }, [])

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`alert alert-${t.type} alert-dismissible d-flex align-items-center gap-2 mb-0 shadow-sm`}
            style={{ minWidth: 300, maxWidth: 450, animation: 'slideIn 0.3s ease' }}
          >
            <i className={`bi ${t.type === 'success' ? 'bi-check-circle-fill' : t.type === 'warning' ? 'bi-exclamation-triangle-fill' : 'bi-x-circle-fill'}`}></i>
            <span className="flex-grow-1 small">{t.message}</span>
            <button type="button" className="btn-close btn-close-sm" onClick={() => removeToast(t.id)}></button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
