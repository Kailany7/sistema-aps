import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { gestanteService, riscoService } from '../services'
import { useToast } from '../contexts/ToastContext'
import { extractError } from '../utils/errors'
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
  const [editando, setEditando] = useState(null)
  const [form, setForm] = useState({})
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { addToast } = useToast()

  useEffect(() => {
    Promise.all([
      gestanteService.listar().then((res) => setGestantes(res.data)),
      riscoService.listar().then((res) => setRiscos(res.data)),
    ]).catch(() => {}).finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    const riscoFilter = searchParams.get('risco')
    if (riscoFilter && riscos.length > 0) {
      const match = riscos.find((r) => r.valor === riscoFilter)
      if (match) setFiltroRisco(match._id)
    }
  }, [searchParams, riscos])

  const filtradas = gestantes.filter((g) => {
    const nome = g.nome?.toLowerCase().includes(busca.toLowerCase())
    const risco = !filtroRisco || g.estratificacaoRisco?._id === filtroRisco
    return nome && risco
  })

  function abrirEdicao(g) {
    setEditando(g)
    setForm({
      nome: g.nome || '',
      cpf: g.cpf || '',
      dataNasc: g.data_nascimento ? new Date(g.data_nascimento).toISOString().slice(0, 10) : '',
      telefone: g.telefone || '',
      endereco: g.endereco || '',
      unidade: g.unidade_saude || '',
      profissional: g.profissional_responsavel || '',
      semanas: g.semanas_gestacao || '',
      gestacoes: g.num_gestacoes || '',
      partos: g.num_partos || '',
      abortos: g.num_abortos || '',
      risco: g.estratificacaoRisco?._id || '',
    })
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSave(e) {
    e.preventDefault()
    try {
      await gestanteService.atualizar(editando._id, form)
      addToast('Gestante atualizada com sucesso!', 'success')
      const res = await gestanteService.listar()
      setGestantes(res.data)
      setEditando(null)
    } catch (err) {
      addToast(extractError(err), 'danger')
    }
  }

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
                    <button className="btn btn-sm btn-outline-primary rounded-circle" title="Editar" onClick={() => abrirEdicao(g)}>
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

      {editando && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1070, background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: '90%', maxWidth: 600, maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Editar Gestante</h5>
              <button className="btn btn-sm btn-outline-secondary rounded-circle" onClick={() => setEditando(null)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label fw-semibold small">Nome Completo</label>
                  <input type="text" name="nome" className="form-control" value={form.nome} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">CPF</label>
                  <input type="text" name="cpf" className="form-control" value={form.cpf} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Data de Nascimento</label>
                  <input type="date" name="dataNasc" className="form-control" value={form.dataNasc} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Telefone</label>
                  <input type="text" name="telefone" className="form-control" value={form.telefone} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Unidade de Saúde</label>
                  <input type="text" name="unidade" className="form-control" value={form.unidade} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold small">Endereço</label>
                  <input type="text" name="endereco" className="form-control" value={form.endereco} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Profissional Responsável</label>
                  <input type="text" name="profissional" className="form-control" value={form.profissional} onChange={handleChange} required />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold small">Semanas de Gestação</label>
                  <input type="number" name="semanas" className="form-control" value={form.semanas} onChange={handleChange} />
                </div>
                <div className="col-md-3">
                  <label className="form-label fw-semibold small">Estratificação de Risco</label>
                  <select name="risco" className="form-select" value={form.risco} onChange={handleChange}>
                    <option value="">Selecione...</option>
                    {riscos.map((r) => (
                      <option key={r._id} value={r._id}>{r.rotulo}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold small">Nº Gestações</label>
                  <input type="number" name="gestacoes" className="form-control" value={form.gestacoes} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold small">Nº Partos</label>
                  <input type="number" name="partos" className="form-control" value={form.partos} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold small">Nº Abortos</label>
                  <input type="number" name="abortos" className="form-control" value={form.abortos} onChange={handleChange} />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-light border" onClick={() => setEditando(null)}>Cancelar</button>
                <button type="submit" className="btn text-white fw-semibold px-4" style={{ background: '#4a8c6f', border: 'none', borderRadius: 8 }}>
                  <i className="bi bi-floppy me-2"></i>Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default ListaGestantes
