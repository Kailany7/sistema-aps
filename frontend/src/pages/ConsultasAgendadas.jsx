import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { consultaService } from '../services'
import PageHeader from '../components/PageHeader'
import AsyncContent from '../components/AsyncContent'

const meses = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
]

const hoje = new Date()
function diasAtras(n) {
  const d = new Date(hoje)
  d.setDate(d.getDate() - n)
  return d.toISOString().slice(0, 10)
}
function diasFrente(n) {
  const d = new Date(hoje)
  d.setDate(d.getDate() + n)
  return d.toISOString().slice(0, 10)
}

function ConsultasAgendadas() {
  const navigate = useNavigate()
  const [consultas, setConsultas] = useState([])
  const [loading, setLoading] = useState(true)
  const [filtroGestante, setFiltroGestante] = useState('')
  const [dataInicio, setDataInicio] = useState('')
  const [dataFim, setDataFim] = useState('')

  useEffect(() => {
    consultaService.listar()
      .then((res) => setConsultas(res.data))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtradas = consultas.filter((c) => {
    const dt = new Date(c.data)
    const matchData = (!dataInicio || dt >= new Date(dataInicio)) &&
                      (!dataFim || dt <= new Date(dataFim + 'T23:59:59'))
    const matchGestante = !filtroGestante ||
      c.gestante_nome?.toLowerCase().includes(filtroGestante.toLowerCase())
    return matchData && matchGestante
  })

  function limparFiltros() {
    setDataInicio('')
    setDataFim('')
    setFiltroGestante('')
  }

  const temFiltro = dataInicio || dataFim || filtroGestante

  return (
    <div className="p-4">
      <PageHeader
        icon="bi-calendar-check"
        title="Consultas Agendadas"
        subtitle="Resumo de todas as consultas registradas no sistema"
      />

      <hr />

      <div className="card shadow-sm border-0 mb-4 card-top-blue">
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <label className="form-label fw-semibold small text-muted mb-1">
                <i className="bi bi-person me-1"></i>Gestante
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nome da gestante..."
                value={filtroGestante}
                onChange={(e) => setFiltroGestante(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold small text-muted mb-1">
                <i className="bi bi-calendar3 me-1"></i>Período
              </label>
              <div className="d-flex align-items-center gap-2">
                <input
                  type="date"
                  className="form-control"
                  value={dataInicio}
                  onChange={(e) => setDataInicio(e.target.value)}
                />
                <span className="text-muted small">até</span>
                <input
                  type="date"
                  className="form-control"
                  value={dataFim}
                  onChange={(e) => setDataFim(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-3 d-flex gap-2 align-items-end">
              {temFiltro && (
                <button className="btn btn-outline-secondary" onClick={limparFiltros}>
                  <i className="bi bi-x-circle me-1"></i>Limpar todos
                </button>
              )}
              <span className="text-muted small d-flex align-items-center ms-auto pb-1">
                <i className="bi bi-file-text me-1"></i>{filtradas.length} consulta(s)
              </span>
            </div>
          </div>
        </div>
      </div>

      <AsyncContent loading={loading} empty={filtradas.length === 0} emptyMessage="Nenhuma consulta encontrada">
        <div className="d-flex flex-column gap-3">
          {filtradas.map((c) => {
            const dt = new Date(c.data)
            return (
              <div
                key={c._id}
                className="consulta-card d-flex justify-content-between align-items-center"
                role="button"
                onClick={() => navigate(`/consulta/${c._id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="consulta-date text-center">
                    <div className="consulta-day">{dt.getDate()}</div>
                    <div className="consulta-month">{meses[dt.getMonth()]}</div>
                  </div>
                  <div>
                    <strong className="consulta-gestante-nome d-block">{c.gestante_nome}</strong>
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
    </div>
  )
}

export default ConsultasAgendadas
