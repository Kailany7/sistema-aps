import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { consultaService } from '../services'
import { useToast } from '../contexts/ToastContext'
import { extractError } from '../utils/errors'
import PageHeader from '../components/PageHeader'

const meses = [
  'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
  'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez',
]

function DetalheConsulta() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [consulta, setConsulta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [form, setForm] = useState({})

  useEffect(() => {
    consultaService.obter(id)
      .then((res) => { setConsulta(res.data); setForm(res.data) })
      .catch(() => addToast('Erro ao carregar consulta', 'danger'))
      .finally(() => setLoading(false))
  }, [id])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSave(e) {
    e.preventDefault()
    try {
      const atualizada = await consultaService.atualizar(id, form)
      setConsulta(atualizada.data)
      setShowModal(false)
      addToast('Consulta atualizada com sucesso!', 'success')
    } catch (err) {
      addToast(extractError(err), 'danger')
    }
  }

  if (loading) {
    return (
      <div className="p-4 d-flex justify-content-center align-items-center" style={{ minHeight: 300 }}>
        <div className="spinner-border text-primary" role="status" />
      </div>
    )
  }

  if (!consulta) {
    return (
      <div className="p-4">
        <PageHeader icon="bi-exclamation-triangle" title="Consulta não encontrada" backRoute="/consultas-agendadas" />
      </div>
    )
  }

  const dt = new Date(consulta.data)

  return (
    <div className="p-4">
      <PageHeader
        icon="bi-file-text"
        title="Detalhes da Consulta"
        subtitle={`${consulta.gestante_nome} — ${dt.getDate()} de ${meses[dt.getMonth()]} de ${dt.getFullYear()}`}
        backRoute="/consultas-agendadas"
      />

      <hr />

      <div className="row g-4">
        <div className="col-md-8">
          <div className="card shadow-sm border-0 card-top-blue">
            <div className="card-body p-4">
              <div className="row g-4">
                <div className="col-6 col-md-3">
                  <small className="text-muted d-block">Data</small>
                  <strong>{dt.toLocaleDateString('pt-BR')}</strong>
                </div>
                <div className="col-6 col-md-3">
                  <small className="text-muted d-block">Tipo</small>
                  <span className="badge bg-primary bg-opacity-10 text-primary">{consulta.tipo || '-'}</span>
                </div>
                <div className="col-6 col-md-3">
                  <small className="text-muted d-block">Profissional</small>
                  <strong>{consulta.profissional || '-'}</strong>
                </div>
                <div className="col-6 col-md-3">
                  <small className="text-muted d-block">Semana Gestacional</small>
                  <strong>{consulta.semanaGestacional ? `${consulta.semanaGestacional}ª` : '-'}</strong>
                </div>
                <div className="col-6 col-md-3">
                  <small className="text-muted d-block">Peso</small>
                  <strong>{consulta.peso ? `${consulta.peso} kg` : '-'}</strong>
                </div>
                <div className="col-6 col-md-3">
                  <small className="text-muted d-block">Pressão Arterial</small>
                  <strong>{consulta.pressaoArterial || '-'}</strong>
                </div>
                <div className="col-6 col-md-3">
                  <small className="text-muted d-block">Batimentos Fetais</small>
                  <strong>{consulta.batimentosFetais || '-'}</strong>
                </div>
                <div className="col-6 col-md-3">
                  <small className="text-muted d-block">Altura Uterina</small>
                  <strong>{consulta.alturaUterina || '-'}</strong>
                </div>
                {consulta.examesSolicitados?.length > 0 && (
                  <div className="col-12">
                    <small className="text-muted d-block">Exames Solicitados</small>
                    <div className="d-flex gap-2 mt-1 flex-wrap">
                      {consulta.examesSolicitados.map((exame, i) => (
                        <span key={i} className="badge bg-light text-dark border">{exame}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 mt-4">
            <div className="card-body p-4">
              <h6 className="fw-semibold mb-3">
                <i className="bi bi-chat-dots me-2"></i>Observações
              </h6>
              <p className="mb-0 text-muted" style={{ whiteSpace: 'pre-wrap' }}>
                {consulta.observacoes || 'Nenhuma observação registrada.'}
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h6 className="fw-semibold mb-3">Ações</h6>
              <button className="btn w-100 mb-2" style={{ background: '#4a8c6f', color: '#fff', borderRadius: 8 }} onClick={() => setShowModal(true)}>
                <i className="bi bi-pencil me-2"></i>Editar Consulta
              </button>
              <button className="btn w-100 btn-outline-secondary" style={{ borderRadius: 8 }} onClick={() => navigate(`/acompanhamento-gestante/${consulta.gestante_id}`)}>
                <i className="bi bi-person me-2"></i>Ver Gestante
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1070, background: 'rgba(0,0,0,0.5)' }}>
          <div className="bg-white rounded-4 shadow-lg p-4" style={{ width: '90%', maxWidth: 560, maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h5 className="fw-bold mb-0">Editar Consulta</h5>
              <button className="btn btn-sm btn-outline-secondary rounded-circle" onClick={() => setShowModal(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Data</label>
                  <input type="date" name="data" className="form-control" value={form.data ? new Date(form.data).toISOString().slice(0, 10) : ''} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Tipo</label>
                  <select name="tipo" className="form-select" value={form.tipo || ''} onChange={handleChange} required>
                    <option value="">Selecione...</option>
                    <option>Pré-Natal</option>
                    <option>Retorno</option>
                    <option>Emergência</option>
                  </select>
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Profissional</label>
                  <input type="text" name="profissional" className="form-control" value={form.profissional || ''} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Semana Gestacional</label>
                  <input type="number" name="semanaGestacional" className="form-control" value={form.semanaGestacional || ''} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold small">Peso (kg)</label>
                  <input type="number" step="0.1" name="peso" className="form-control" value={form.peso || ''} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold small">Pressão Arterial</label>
                  <input type="text" name="pressaoArterial" className="form-control" value={form.pressaoArterial || ''} onChange={handleChange} />
                </div>
                <div className="col-md-4">
                  <label className="form-label fw-semibold small">Batimentos Fetais</label>
                  <input type="number" name="batimentosFetais" className="form-control" value={form.batimentosFetais || ''} onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="form-label fw-semibold small">Observações</label>
                  <textarea name="observacoes" rows={4} className="form-control" value={form.observacoes || ''} onChange={handleChange}></textarea>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 mt-4">
                <button type="button" className="btn btn-light border" onClick={() => setShowModal(false)}>Cancelar</button>
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

export default DetalheConsulta
