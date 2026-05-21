import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { encaminhamentoService } from '../services'
import { useToast } from '../contexts/ToastContext'
import { extractError } from '../utils/errors'
import PageHeader from '../components/PageHeader'
import AsyncContent from '../components/AsyncContent'

function riscoStyle(risco) {
  if (risco === 'Alto') return { borderColor: '#dc3545', badgeClass: 'bg-danger' }
  if (risco === 'Intermediário') return { borderColor: '#ffc107', badgeClass: 'bg-warning text-dark' }
  return { borderColor: '#28a745', badgeClass: 'bg-success' }
}

function ListaEncaminhamentos() {
  const [encaminhamentos, setEncaminhamentos] = useState([])
  const [busca, setBusca] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { addToast } = useToast()

  useEffect(() => {
    encaminhamentoService.listar()
      .then((res) => setEncaminhamentos(res.data))
      .catch((err) => addToast(extractError(err), 'error'))
      .finally(() => setLoading(false))
  }, [])

  const filtradas = encaminhamentos.filter((e) =>
    e.nome.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="p-4">
      <PageHeader icon="bi-send" title="Encaminhamentos" subtitle={`${encaminhamentos.length} encaminhamentos realizados`} backRoute="/dashboard">
        <button className="btn btn-primary" onClick={() => navigate('/novo-encaminhamento')}>
          <i className="bi bi-plus-lg me-1"></i> Novo Encaminhamento
        </button>
      </PageHeader>

      <hr />

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control" placeholder="Buscar por nome da gestante..." value={busca} onChange={(e) => setBusca(e.target.value)} />
          </div>
        </div>
      </div>

      <AsyncContent loading={loading} empty={filtradas.length === 0} emptyMessage="Nenhum encaminhamento encontrado">
        <div className="d-flex flex-column gap-3">
          {filtradas.map((e) => {
            const { borderColor, badgeClass } = riscoStyle(e.risco)
            return (
              <div key={e._id} className="consulta-card d-flex align-items-start gap-3"
                style={{ cursor: 'pointer', borderLeft: `4px solid ${borderColor}` }}
                onClick={() => navigate(`/encaminhamento/${e._id}`)}>
                <div className="flex-grow-1">
                  <span className={`badge risco-badge ${badgeClass}`}>{e.risco}</span>
                  <strong className="consulta-gestante-nome d-block mt-1">{e.nome}</strong>
                  <div className="d-flex flex-wrap gap-3 mt-1">
                    <small className="text-muted"><i className="bi bi-building me-1"></i>{e.unidade}</small>
                    <small className="text-muted"><i className="bi bi-send me-1"></i>{e.destino}</small>
                    <small className="text-muted"><i className="bi bi-calendar me-1"></i>{e.dataEncaminhamento}</small>
                    <small className="text-muted"><i className="bi bi-file-text me-1"></i>{e.resumo}</small>
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

export default ListaEncaminhamentos
