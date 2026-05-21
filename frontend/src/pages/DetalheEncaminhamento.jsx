import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { encaminhamentoService } from '../services'
import { useToast } from '../contexts/ToastContext'
import { extractError } from '../utils/errors'
import PageHeader from '../components/PageHeader'
import CardSection from '../components/CardSection'
import AsyncContent from '../components/AsyncContent'

const riscoColorMap = { Alto: 'danger', Intermediário: 'warning text-dark' }

function DetalheEncaminhamento() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToast } = useToast()
  const [e, setE] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    encaminhamentoService.obter(id)
      .then((res) => setE(res.data))
      .catch((err) => addToast(extractError(err), 'error'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <div className="p-4">
      <AsyncContent loading={loading} error={!e && !loading && 'Encaminhamento não encontrado'}>
        {e && (
          <>
            <PageHeader icon="bi-send" title="Detalhes do Encaminhamento" subtitle={e.nome} backRoute="/encaminhamentos">
              <span className={`badge bg-${riscoColorMap[e.risco] || 'success'} fs-6`}>{e.classificacao}</span>
            </PageHeader>

            <hr />

            <div className="row g-4">
              <div className="col-md-4">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body text-center">
                    <i className="bi bi-building fs-1 text-primary mb-2"></i>
                    <h6 className="fw-bold mb-0">{e.unidade}</h6>
                    <small className="text-muted">Unidade de Origem</small>
                    <p className="mb-0 mt-2 small text-muted">ACS: <strong>{e.acs}</strong></p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body text-center">
                    <i className="bi bi-geo-alt fs-1 text-warning mb-2"></i>
                    <h6 className="fw-bold mb-0">{e.destino || e.especialidade}</h6>
                    <small className="text-muted">Especialidade</small>
                    <p className="mb-0 mt-2 small text-muted">Data: <strong>{e.dataEncaminhamento}</strong></p>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card shadow-sm border-0 h-100">
                  <div className="card-body text-center">
                    <i className="bi bi-exclamation-triangle fs-1 text-danger mb-2"></i>
                    <h6 className="fw-bold mb-0">{e.classificacao}</h6>
                    <small className="text-muted">Classificação de Risco</small>
                    <p className="mb-0 mt-2 small text-muted"><strong>{e.risco}</strong></p>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4 mt-2">
              <CardSection color="login" icon="bi-person" title="Dados de Identificação">
                <div className="row">
                  <div className="col-md-3"><small className="text-muted">Nome</small><p className="mb-0 fw-medium">{e.nome}</p></div>
                  <div className="col-md-2"><small className="text-muted">CPF</small><p className="mb-0 fw-medium">{e.cpf}</p></div>
                  <div className="col-md-2"><small className="text-muted">Data de Nasc.</small><p className="mb-0 fw-medium">{e.dataNasc}</p></div>
                  <div className="col-md-1"><small className="text-muted">Idade</small><p className="mb-0 fw-medium">{e.idade} anos</p></div>
                  <div className="col-md-1"><small className="text-muted">Peso</small><p className="mb-0 fw-medium">{e.peso} kg</p></div>
                  <div className="col-md-1"><small className="text-muted">Altura</small><p className="mb-0 fw-medium">{e.altura} m</p></div>
                  <div className="col-md-2"><small className="text-muted">Telefone</small><p className="mb-0 fw-medium">{e.telefone}</p></div>
                </div>
                <div className="row mt-2">
                  <div className="col-md-6"><small className="text-muted">Endereço</small><p className="mb-0 fw-medium">{e.endereco}</p></div>
                  <div className="col-md-6"><small className="text-muted">Cidade</small><p className="mb-0 fw-medium">{e.cidade}</p></div>
                </div>
              </CardSection>

              <CardSection color="orange" icon="bi-clipboard2-pulse" title="Resumo Clínico">
                <p className="mb-0">{e.resumo}</p>
              </CardSection>

              <CardSection color="blue" icon="bi-chat-dots" title="Observações e Comentários">
                <p className="mb-0">{e.observacoes}</p>
              </CardSection>
            </div>
          </>
        )}
      </AsyncContent>
    </div>
  )
}

export default DetalheEncaminhamento
