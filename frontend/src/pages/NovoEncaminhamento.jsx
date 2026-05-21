import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { unidadeService, riscoService, encaminhamentoService } from '../services'
import { useToast } from '../contexts/ToastContext'
import { extractError } from '../utils/errors'
import PageHeader from '../components/PageHeader'
import CardSection from '../components/CardSection'
import Dropzone from '../components/Dropzone'

function formatDate(str) {
  if (!str) return ''
  if (str.includes('/')) { const [d, m, a] = str.split('/'); return `${a}-${m}-${d}` }
  return str
}

function NovoEncaminhamento() {
  const location = useLocation()
  const gestante = location.state?.gestante
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [arquivos, setArquivos] = useState([])
  const [loading, setLoading] = useState(false)
  const [unidades, setUnidades] = useState([])
  const [riscos, setRiscos] = useState([])

  const [form, setForm] = useState({
    nome: gestante?.nome || '', cpf: gestante?.cpf || '',
    dataNasc: formatDate(gestante?.dataNasc), idade: gestante?.idade?.toString() || '',
    peso: gestante?.peso?.toString() || '', altura: gestante?.altura?.toString() || '',
    telefone: gestante?.telefone || '', endereco: gestante?.endereco || '',
    cidade: gestante?.cidade || '', unidade: '', acs: '', resumo: '', risco: '', observacoes: '',
  })

  useEffect(() => {
    unidadeService.listar().then((res) => setUnidades(res.data)).catch(() => {})
    riscoService.listar().then((res) => setRiscos(res.data)).catch(() => {})
  }, [])

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit() {
    if (!form.nome || !form.unidade || !form.risco) {
      addToast('Preencha nome, unidade e classificação de risco', 'warning')
      return
    }
    setLoading(true)
    try {
      await encaminhamentoService.criar(form)
      addToast('Encaminhamento registrado com sucesso!', 'success')
      navigate('/encaminhamentos')
    } catch (err) {
      addToast(extractError(err), 'danger')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      <PageHeader icon="bi-send" title="Novo Encaminhamento" subtitle="Preencha os dados para o encaminhamento" backRoute="/encaminhamentos" />

      <hr />

      <div className="row g-4">
        <CardSection color="login" icon="bi-person" title="Dados de Identificação">
          <div className="row mb-3">
            {[
              { col: 4, name: 'nome', label: 'Nome Completo', placeholder: 'Nome da gestante' },
              { col: 4, name: 'cpf', label: 'CPF', placeholder: '000.000.000-00' },
              { col: 4, name: 'dataNasc', label: 'Data de Nascimento', type: 'date' },
            ].map((f) => (
              <div className={`col-md-${f.col}`} key={f.name}>
                <label className="form-label">{f.label}</label>
                <input type={f.type || 'text'} name={f.name} className="form-control" placeholder={f.placeholder} value={form[f.name]} onChange={handleChange} />
              </div>
            ))}
          </div>
          <div className="row mb-3">
            {['idade', 'peso', 'altura', 'telefone'].map((f) => (
              <div className="col-md-3" key={f}>
                <label className="form-label">{f === 'peso' ? 'Peso (kg)' : f === 'altura' ? 'Altura (m)' : f === 'telefone' ? 'Telefone' : 'Idade'}</label>
                <input type={f === 'peso' || f === 'altura' ? 'number' : f === 'idade' ? 'number' : 'text'} name={f} className="form-control"
                  placeholder={f === 'peso' ? '0' : f === 'altura' ? '1.60' : f === 'telefone' ? '(83) 9xxxx-xxxx' : '0'}
                  step={f === 'peso' ? '0.1' : f === 'altura' ? '0.01' : undefined}
                  value={form[f]} onChange={handleChange} />
              </div>
            ))}
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Endereço</label>
              <input type="text" name="endereco" className="form-control" placeholder="Rua, número, bairro" value={form.endereco} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Cidade</label>
              <input type="text" name="cidade" className="form-control" placeholder="Cidade" value={form.cidade} onChange={handleChange} />
            </div>
          </div>
        </CardSection>

        <CardSection color="blue" icon="bi-building" title="Unidade de Origem">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Unidade Básica de Saúde</label>
              <select name="unidade" className="form-select" value={form.unidade} onChange={handleChange}>
                <option value="">Selecione a unidade...</option>
                {unidades.map((u) => (<option key={u._id} value={u.nome}>{u.nome}</option>))}
              </select>
            </div>
            <div className="col-md-6">
              <label className="form-label">ACS Responsável</label>
              <input type="text" name="acs" className="form-control" placeholder="Nome do ACS" value={form.acs} onChange={handleChange} />
            </div>
          </div>
        </CardSection>

        <CardSection color="orange" icon="bi-clipboard2-pulse" title="Informações Clínicas">
          <div className="mb-3">
            <label className="form-label">Resumo Clínico (motivo do encaminhamento)</label>
            <textarea name="resumo" className="form-control" rows="4" placeholder="Ex: diabetes gestacional, hipertensão arterial, pré-eclâmpsia, etc." value={form.resumo} onChange={handleChange}></textarea>
          </div>
        </CardSection>

        <CardSection color="purple" icon="bi-exclamation-triangle" title="Estratificação de Risco">
          <div className="mb-3">
            <label className="form-label">Classificação detalhada do risco gestacional</label>
            <select name="risco" className="form-select" value={form.risco} onChange={handleChange}>
              <option value="">Selecione a classificação...</option>
              {riscos.map((r) => (<option key={r._id} value={r.valor}>{r.rotulo}</option>))}
            </select>
          </div>
        </CardSection>

        <CardSection color="green" icon="bi-paperclip" title="Anexo - Exames e Cartão da Gestante">
          <div className="mb-3">
            <label className="form-label">Anexar arquivos (cartão da gestante, principais exames, informações atualizadas)</label>
            <Dropzone inputId="file-input-enc" onFilesChange={setArquivos} />
            {arquivos.length > 0 && (
              <ul className="list-group mt-2">
                {arquivos.map((file, index) => (
                  <li key={index} className="list-group-item d-flex align-items-center justify-content-between py-1">
                    <small><i className="bi bi-file-earmark me-1"></i>{file.name}</small>
                    <button className="btn btn-sm btn-outline-danger border-0" onClick={() => setArquivos((prev) => prev.filter((_, i) => i !== index))}>
                      <i className="bi bi-x-lg"></i>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Observações e Comentários</label>
            <textarea name="observacoes" className="form-control" rows="3" placeholder="Observações e comentários adicionais sobre o encaminhamento" value={form.observacoes} onChange={handleChange}></textarea>
          </div>
        </CardSection>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-outline-secondary px-4" onClick={() => navigate('/encaminhamentos')}>Cancelar</button>
        <button className="btn btn-primary px-4" onClick={handleSubmit} disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm me-1"></span> : <i className="bi bi-check-lg me-1"></i>} Salvar Encaminhamento
        </button>
      </div>
    </div>
  )
}

export default NovoEncaminhamento
