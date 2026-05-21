import { useNavigate } from 'react-router-dom'

export default function PageHeader({ icon, title, subtitle, backRoute, children }) {
  const navigate = useNavigate()

  return (
    <div className="d-flex align-items-center gap-3 mb-1">
      <i className={`bi ${icon} fs-2 text-success`}></i>
      <div>
        <h4 className="fw-bold mb-0">{title}</h4>
        <p className="text-muted mb-0">{subtitle}</p>
      </div>
      {backRoute && (
        <button className="btn btn-outline-secondary ms-auto" onClick={() => navigate(backRoute)}>
          <i className="bi bi-arrow-left me-1"></i> Voltar
        </button>
      )}
      {children}
    </div>
  )
}
