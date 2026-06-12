import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'
import PageHeader from '../components/PageHeader'
import CardSection from '../components/CardSection'
import AsyncContent from '../components/AsyncContent'
import { extractError } from '../utils/errors'
import { useToast } from '../contexts/ToastContext'

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
    { color: 'green', icon: 'bi-people', label: 'Total de Gestantes', value: data?.totalGestantes },
    { color: 'red', icon: 'bi-exclamation-triangle', label: 'Alto Risco', value: data?.altoRisco },
    { color: 'blue', icon: 'bi-calendar-check', label: 'Consultas Agendadas', value: data?.consultasAgendadas },
    { color: 'yellow', icon: 'bi-bell', label: 'Alertas Importantes', value: data?.alertasRisco?.length },
  ]

  function formatDate(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('pt-BR')
  }

  function formatDateTime(dateStr) {
    if (!dateStr) return ''
    const d = new Date(dateStr)
    return d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
  }

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

      <div className="row g-3 mb-4">
        {cards.map((c) => (
          <div key={c.label} className="col-6 col-md-3">
            <div className={`card border-0 shadow-sm card-top-${c.color} h-100`}>
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
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Gestante</th>
                      <th>Data</th>
                      <th>Tipo</th>
                      <th>Profissional</th>
                      <th>Semana</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.consultasRecentes?.map((c, i) => (
                      <tr key={i} role="button" className="cursor-pointer"
                        onClick={() => navigate(`/acompanhamento-gestante/${c.gestanteId}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td className="fw-medium">{c.gestanteNome}</td>
                        <td className="text-nowrap">{formatDateTime(c.data)}</td>
                        <td>{c.tipo || '-'}</td>
                        <td>{c.profissional || '-'}</td>
                        <td>{c.semanaGestacional ? `${c.semanaGestacional}ª` : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
