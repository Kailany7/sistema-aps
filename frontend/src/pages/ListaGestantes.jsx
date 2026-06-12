import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gestanteService, riscoService } from '../services'
import PageHeader from '../components/PageHeader'
import AsyncContent from '../components/AsyncContent'

function riscoStyle(risco) {
  const v = risco?.valor
  if (v === 'Alto') return { borderColor: '#dc3545', badgeClass: 'bg-danger', color: 'danger' }
  if (v === 'Intermediário') return { borderColor: '#ffc107', badgeClass: 'bg-warning text-dark', color: 'warning' }
  return { borderColor: '#28a745', badgeClass: 'bg-success', color: 'success' }
}

function ListaGestantes() {
  const [busca, setBusca] = useState('')
  const [filtroRisco, setFiltroRisco] = useState('')
  const [gestantes, setGestantes] = useState([])
  const [riscos, setRiscos] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([
      gestanteService.listar().then((res) => setGestantes(res.data)),
      riscoService.listar().then((res) => setRiscos(res.data)),
    ]).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const filtradas = gestantes.filter((g) => {
    const nome = g.nome?.toLowerCase().includes(busca.toLowerCase())
    const risco = !filtroRisco || g.estratificacaoRisco?._id === filtroRisco
    return nome && risco
  })

  return (
    <div className="p-4">
      <PageHeader icon="bi-people" title="Lista de Gestantes" subtitle={`${gestantes.length} gestantes cadastradas`} backRoute="/dashboard">
        <button className="btn btn-primary" onClick={() => navigate('/cadastro-gestante')}>
          <i className="bi bi-plus-lg me-1"></i> Nova Gestante
        </button>
      </PageHeader>

      <hr />

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex align-items-center gap-3">
            <div className="flex-grow-1">
              <div className="input-group">
                <span className="input-group-text"><i className="bi bi-search"></i></span>
                <input type="text" className="form-control" placeholder="Buscar por nome da gestante..." value={busca} onChange={(e) => setBusca(e.target.value)} />
              </div>
            </div>
            <div style={{ minWidth: 220 }}>
              <select className="form-select" value={filtroRisco} onChange={(e) => setFiltroRisco(e.target.value)}>
                <option value="">Todos os riscos</option>
                {riscos.map((r) => (
                  <option key={r._id} value={r._id}>{r.rotulo}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <AsyncContent loading={loading} empty={filtradas.length === 0} emptyMessage="Nenhuma gestante encontrada">
        <div className="row g-3">
          {filtradas.map((g) => {
            const risco = g.estratificacaoRisco?.rotulo || g.estratificacaoRisco?.valor || 'Baixo'
            const { borderColor, badgeClass } = riscoStyle(g.estratificacaoRisco)
            return (
              <div className="col-12" key={g._id}>
                <div className="consulta-card d-flex align-items-start gap-3" style={{ cursor: 'pointer', borderLeft: `4px solid ${borderColor}` }}
                  onClick={() => navigate(`/acompanhamento-gestante/${g._id}`)}>
                  <div className="flex-grow-1">
                    <span className={`badge risco-badge ${badgeClass}`}>{risco}</span>
                    <strong className="consulta-gestante-nome d-block mt-1">{g.nome}</strong>
                    <div className="d-flex flex-wrap gap-3 mt-1">
                      <small className="text-muted"><i className="bi bi-building me-1"></i>{g.unidade_saude}</small>
                      <small className="text-muted"><i className="bi bi-telephone me-1"></i>{g.telefone}</small>
                    </div>
                  </div>
                  <div className="d-flex gap-1 mt-1" onClick={(e) => e.stopPropagation()}>
                    <button className="btn btn-sm btn-outline-primary rounded-circle" title="Editar">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-outline-warning rounded-circle" title="Encaminhar"
                      onClick={(e) => { e.stopPropagation(); navigate('/novo-encaminhamento', { state: { gestante: g } }) }}>
                      <i className="bi bi-send"></i>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </AsyncContent>
    </div>
  )
}

export default ListaGestantes
