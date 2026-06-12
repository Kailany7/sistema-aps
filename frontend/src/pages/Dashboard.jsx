import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import PageHeader from '../components/PageHeader'
import CardSection from '../components/CardSection'
import AsyncContent from '../components/AsyncContent'
import { extractError } from '../utils/errors'
import { useToast } from '../contexts/ToastContext'

const meses = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
]

function Dashboard() {
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    api.get('/dashboard')
      .then((res) => setData(res.data.data))
      .catch((err) => {
        setError(extractError(err))
        addToast(extractError(err), 'danger')
      })
      .finally(() => setLoading(false))
  }, [])

  const cards = [
    { color: 'green', icon: 'bi-people', label: 'Total de Gestantes', value: data?.totalGestantes, route: '/lista-gestantes' },
    { color: 'red', icon: 'bi-exclamation-triangle', label: 'Alto Risco', value: data?.altoRisco, route: '/lista-gestantes?risco=Alto' },
    { color: 'blue', icon: 'bi-calendar-check', label: 'Consultas Agendadas', value: data?.consultasAgendadas, route: '/consultas-agendadas' },
  ]

  function riscoBadgeClass(risco) {
    const v = risco?.valor?.toLowerCase()
    if (v === 'alto') return 'bg-danger'
    if (v === 'intermediário' || v === 'medio') return 'bg-warning text-dark'
    if (v === 'baixo') return 'bg-success'
    return 'bg-secondary'
  }

  return (
    <div className="p-4">
      <PageHeader
        icon="bi-house-door"
        title="Página Principal"
        subtitle="Visão geral do sistema de gestão de gestantes de alto risco"
      />
      <p></p>

      <div className="row g-3 mb-4">
        {cards.map((c) => (
          <div key={c.label} className="col-6 col-md-3">
            <div className={`card border-0 shadow-sm card-top-${c.color} h-100`} role="button" style={{ cursor: 'pointer' }} onClick={() => navigate(c.route)}>
              <div className="card-body d-flex align-items-center gap-3">
                <i className={`bi ${c.icon} fs-1 text-${c.color === 'yellow' ? 'warning' : c.color}`}></i>
                <div>
                  <h6 className="mb-0 text-muted small">{c.label}</h6>
                  <span className="fs-3 fw-bold">{loading ? '--' : c.value ?? '--'}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4">
        <div className="col-md-7">
          <CardSection color="blue" icon="bi-clock-history" title="Consultas Recentes">
            <AsyncContent
              loading={loading}
              error={error}
              empty={data?.consultasRecentes?.length === 0}
              emptyMessage="Nenhuma consulta registrada"
            >
              <div className="d-flex flex-column gap-3">
                {data?.consultasRecentes?.map((c) => {
                  const dt = new Date(c.data)
                  return (
                    <div
                      key={c.consultaId}
                      className="consulta-card d-flex justify-content-between align-items-center"
                      role="button"
                      onClick={() => navigate(`/consulta/${c.consultaId}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <div className="consulta-date text-center">
                          <div className="consulta-day">{dt.getDate()}</div>
                          <div className="consulta-month">{meses[dt.getMonth()]}</div>
                        </div>
                        <div>
                          <strong className="consulta-gestante-nome d-block">{c.gestanteNome}</strong>
                          <div className="d-flex gap-2 mt-1 align-items-center">
                            <span className="badge bg-primary bg-opacity-10 text-primary fw-normal">
                              {c.tipo || '-'}
                            </span>
                            <small className="text-muted">
                              <i className="bi bi-person me-1"></i>{c.profissional || '-'}
                            </small>
                            {c.semanaGestacional && (
                              <small className="text-muted">
                                <i className="bi bi-calendar-week me-1"></i>{c.semanaGestacional}ª sem.
                              </small>
                            )}
                          </div>
                        </div>
                      </div>
                      <i className="bi bi-chevron-right text-muted fs-5"></i>
                    </div>
                  )
                })}
              </div>
            </AsyncContent>
          </CardSection>
        </div>

        <div className="col-md-5">
          <CardSection color="red" icon="bi-exclamation-triangle" title="Alertas de Risco">
            <AsyncContent
              loading={loading}
              error={error}
              empty={data?.alertasRisco?.length === 0}
              emptyMessage="Nenhuma gestante em alto risco no momento"
            >
              <div className="d-flex flex-column gap-2">
                {data?.alertasRisco?.map((g) => (
                  <div key={g._id} className="consulta-card d-flex align-items-center gap-3"
                    role="button"
                    onClick={() => navigate(`/acompanhamento-gestante/${g._id}`)}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className="flex-shrink-0">
                      <span className={`risco-badge ${riscoBadgeClass(g.estratificacaoRisco)}`}>
                        {g.estratificacaoRisco?.rotulo || g.estratificacaoRisco?.valor || "N/A"}
                      </span>
                    </div>
                    <div className="flex-grow-1">
                      <div className="consulta-gestante-nome fw-bold">{g.nome}</div>
                      <small className="text-muted">
                        <i className="bi bi-building me-1"></i>{g.unidade_saude}
                        {g.semanas_gestacao && (
                          <span className="ms-2">
                            <i className="bi bi-calendar-week me-1"></i>{g.semanas_gestacao} semanas
                          </span>
                        )}
                      </small>
                    </div>
                    <i className="bi bi-chevron-right text-muted"></i>
                  </div>
                ))}
              </div>
            </AsyncContent>
          </CardSection>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
