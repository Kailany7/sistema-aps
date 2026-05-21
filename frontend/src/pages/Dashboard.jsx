function Dashboard() {
  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <h4 className="fw-bold mb-1">Página Principal</h4>
        <p className="text-muted mb-0">Visão geral do sistema de gestão de gestantes de alto risco</p>
      </div>
      <div className="row g-4">
        {[
          { color: 'green', icon: 'bi-people', label: 'Total de Gestantes' },
          { color: 'red', icon: 'bi-exclamation-triangle', label: 'Alto Risco' },
          { color: 'blue', icon: 'bi-calendar-check', label: 'Consultas Agendadas' },
          { color: 'yellow', icon: 'bi-bell', label: 'Alertas Importantes' },
        ].map((c) => (
          <div key={c.label} className="col-md-3">
            <div className={`card border-0 shadow-sm card-top-${c.color}`}>
              <div className="card-body">
                <div className="d-flex align-items-center gap-3">
                  <i className={`bi ${c.icon} fs-1 text-${c.color === 'yellow' ? 'warning' : c.color}`}></i>
                  <div>
                    <h6 className="mb-0">{c.label}</h6>
                    <span className="fs-4 fw-bold">--</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
