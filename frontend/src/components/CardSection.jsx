export default function CardSection({ color, icon, title, children }) {
  return (
    <div className="col-12">
      <div className={`card shadow-sm card-top-${color}`}>
        <div className="card-body">
          <h6 className="fw-bold mb-3">
            <i className={`bi ${icon} me-2 text-${color === 'login' ? 'success' : color === 'orange' ? 'warning' : color}`}></i>
            {title}
          </h6>
          {children}
        </div>
      </div>
    </div>
  )
}
