import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { gestanteService, unidadeService, riscoService } from '../services'
import { useToast } from '../contexts/ToastContext'
import { extractError } from '../utils/errors'
import { useForm } from '../hooks/useForm'
import PageHeader from '../components/PageHeader'
import CardSection from '../components/CardSection'
import Dropzone from '../components/Dropzone'

const initialForm = {
  nome: '', cpf: '', dataNasc: '', telefone: '', telSecundario: '',
  endereco: '', dum: '', dpp: '', semanas: '', gestacoes: '', partos: '', abortos: '',
  unidade: '', profissional: '', resumoClinico: '', historicoDoencas: '', risco: '',
}

const requiredFields = { nome: 'Nome', cpf: 'CPF', dataNasc: 'Data de Nascimento', telefone: 'Telefone', endereco: 'Endereço', unidade: 'Unidade de Saúde', profissional: 'Profissional' }

function CadastroGestante() {
  const [unidades, setUnidades] = useState([])
  const [riscos, setRiscos] = useState([])
  const [arquivos, setArquivos] = useState([])
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { addToast } = useToast()
  const { form, setForm, handleChange, handleBlur, cls, selCls } = useForm(initialForm)

  useEffect(() => {
    unidadeService.listar().then((res) => setUnidades(res.data)).catch(() => {})
    riscoService.listar().then((res) => setRiscos(res.data)).catch(() => {})
  }, [])

  function onFieldChange(e) {
    const { name, value } = e.target
    handleChange(e)
    if (name === 'dataNasc' && value) {
      const [a, m, d] = value.split('-').map(Number)
      const hoje = new Date()
      let idade = hoje.getFullYear() - a
      const mes = hoje.getMonth() + 1
      if (mes < m || (mes === m && hoje.getDate() < d)) idade--
      setForm((prev) => ({ ...prev, idade: idade > 0 ? String(idade) : '' }))
    }
  }

  async function handleSubmit() {
    for (const [key, label] of Object.entries(requiredFields)) {
      if (!form[key]?.trim()) { addToast(`Campo obrigatório: ${label}`, 'warning'); return }
    }
    setLoading(true)
    try {
      await gestanteService.criar(form)
      addToast('Gestante cadastrada com sucesso!', 'success')
      navigate('/lista-gestantes')
    } catch (err) {
      addToast(extractError(err), 'danger')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-4">
      <PageHeader icon="bi-person-plus" title="Cadastro de Gestantes" subtitle="Preencha os dados da gestante" backRoute="/dashboard" />

      <hr />

      <div className="row g-4">
        <CardSection color="login" icon="bi-person" title="Dados Pessoais">
          <div className="mb-3">
            <label className="form-label">Nome Completo <span className="text-danger">*</span></label>
            <input type="text" name="nome" className={cls('nome')} placeholder="Nome completo da gestante" value={form.nome} onChange={onFieldChange} onBlur={handleBlur} />
          </div>
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label">CPF <span className="text-danger">*</span></label>
              <input type="text" name="cpf" className={cls('cpf')} placeholder="000.000.000-00" value={form.cpf} onChange={onFieldChange} onBlur={handleBlur} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Data de Nascimento <span className="text-danger">*</span></label>
              <input type="date" name="dataNasc" className={cls('dataNasc')} value={form.dataNasc} onChange={onFieldChange} onBlur={handleBlur} />
            </div>
            <div className="col-md-4">
              <label className="form-label">Idade</label>
              <input type="number" name="idade" className="form-control" value={form.idade} readOnly />
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Telefone <span className="text-danger">*</span></label>
              <input type="text" name="telefone" className={cls('telefone')} placeholder="(83) 9xxxx-xxxx" value={form.telefone} onChange={onFieldChange} onBlur={handleBlur} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Telefone Secundário</label>
              <input type="text" name="telSecundario" className="form-control" placeholder="(83) 9xxxx-xxxx" value={form.telSecundario} onChange={onFieldChange} />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Endereço Completo <span className="text-danger">*</span></label>
            <input type="text" name="endereco" className={cls('endereco')} placeholder="Rua, número, bairro, cidade, CEP" value={form.endereco} onChange={onFieldChange} onBlur={handleBlur} />
          </div>
        </CardSection>

        <CardSection color="blue" icon="bi-heart-pulse" title="Informações da Gestação">
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">DUM (Data da Última Menstruação)</label>
              <input type="date" name="dum" className="form-control" value={form.dum} onChange={onFieldChange} />
            </div>
            <div className="col-md-6">
              <label className="form-label">DPP (Data Provável do Parto)</label>
              <input type="date" name="dpp" className="form-control" value={form.dpp} onChange={onFieldChange} />
            </div>
          </div>
          <div className="row mb-3">
            {['semanas', 'gestacoes', 'partos', 'abortos'].map((f) => (
              <div className="col-md-3" key={f}>
                <label className="form-label">{f === 'semanas' ? 'Semanas de Gestação' : f === 'gestacoes' ? 'Número de Gestações' : f === 'partos' ? 'Número de Partos' : 'Número de Abortos'}</label>
                <input type="number" name={f} className="form-control" value={form[f]} onChange={onFieldChange} />
              </div>
            ))}
          </div>
        </CardSection>

        <CardSection color="orange" icon="bi-building" title="Unidade de Saúde">
          <div className="mb-3">
            <label className="form-label">Unidade de Saúde <span className="text-danger">*</span></label>
            <select name="unidade" className={selCls('unidade')} value={form.unidade} onChange={onFieldChange} onBlur={handleBlur}>
              <option value="">Selecione a unidade...</option>
              {unidades.map((u) => (<option key={u._id} value={u.nome}>{u.nome}</option>))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Profissional Responsável <span className="text-danger">*</span></label>
            <input type="text" name="profissional" className={cls('profissional')} placeholder="Nome do profissional" value={form.profissional} onChange={onFieldChange} onBlur={handleBlur} />
          </div>
        </CardSection>

        <CardSection color="purple" icon="bi-clipboard2-pulse" title="Informações Clínicas">
          <div className="mb-3">
            <label className="form-label">Resumo Clínico</label>
            <textarea name="resumoClinico" className="form-control" rows="3" placeholder="Resumo do quadro clínico da gestante" value={form.resumoClinico} onChange={onFieldChange}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Histórico de Doenças</label>
            <textarea name="historicoDoencas" className="form-control" rows="3" placeholder="Histórico de doenças preexistentes" value={form.historicoDoencas} onChange={onFieldChange}></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Estratificação de Risco</label>
            <select name="risco" className="form-select" value={form.risco} onChange={onFieldChange}>
              <option value="">Selecione o nível de risco...</option>
              {riscos.map((r) => (<option key={r._id} value={r.valor}>{r.rotulo}</option>))}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Anexar Documentos</label>
            <Dropzone inputId="file-input" onFilesChange={setArquivos} />
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
        </CardSection>
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-outline-secondary px-4" onClick={() => navigate('/dashboard')}>Cancelar</button>
        <button className="btn btn-primary px-4" onClick={handleSubmit} disabled={loading}>
          {loading ? <span className="spinner-border spinner-border-sm me-1"></span> : <i className="bi bi-check-lg me-1"></i>} Salvar Cadastro
        </button>
      </div>
    </div>
  )
}

export default CadastroGestante
