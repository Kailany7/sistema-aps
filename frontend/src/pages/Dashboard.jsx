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
    { color: 'blue', icon: 'bi-calendar-check', label: 'Consultas Hoje', value: data?.consultasHoje },
  ]

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
        <div className="col-12">
          <CardSection color="blue" icon="bi-calendar-check" title="Consultas de Hoje">
            <AsyncContent
              loading={loading}
              error={error}
              empty={data?.consultasHojeLista?.length === 0}
              emptyMessage="Nenhuma consulta agendada para hoje"
            >
              <div className="d-flex flex-column gap-3">
                {data?.consultasHojeLista?.map((c) => {
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
      </div>
    </div>
  )
}

export default Dashboard
