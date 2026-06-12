import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
  FileSpreadsheet,
  Download,
  FileText,
  Calendar,
  Users,
  TrendingUp,
  Filter,
} from 'lucide-react'

import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'

function Relatorios() {
  const navigate = useNavigate()
  const [tipoRelatorio, setTipoRelatorio] = useState('')

  const handleExportPDF = () => {
    alert('Exportando relatório em PDF...')
  }

  const handleExportExcel = () => {
    alert('Exportando relatório em Excel...')
  }

  const configsCards = {
    'gestantes': { border: '#3b82f6', bg: '#eff6ff', iconClass: 'text-primary' },
    'alto-risco': { border: '#ef4444', bg: '#fef2f2', iconClass: 'text-danger' },
    'consultas': { border: '#22c55e', bg: '#f0fdf4', iconClass: 'text-success' },
    'encaminhamentos': { border: '#eab308', bg: '#fef9c3', iconClass: 'text-warning' },
    'unidade': { border: '#a855f7', bg: '#faf5ff', iconClass: 'text-purple' },
    'personalizado': { border: '#ec4899', bg: '#fdf2f8', iconClass: 'text-pink' }
  }

  return (
    <div className="container-fluid py-4 ps-md-5 pe-md-4" style={{ minHeight: '100vh' }}>
      <div className="mx-auto" style={{ maxWidth: '1400px' }}>
        
        {/* HEADER */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-3">
            <FileText size={32} className="text-primary" style={{ color: '#1b2559' }} />
            <div>
              <h1 className="fw-bold mb-0" style={{ color: '#1b2559', fontSize: '28px' }}>
                Relatórios
              </h1>
              <p className="text-muted mb-0" style={{ fontSize: '13px' }}>
                Geração e exportação de relatórios do sistema
              </p>
            </div>
          </div>

          <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(`/dashboard`)}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Voltar
        </button>
      </div>

        {/* CARDS DE SELEÇÃO */}
        <div className="row g-4 mb-4">
          {/* GESTANTES CADASTRADAS */}
          <div className="col-md-6 col-xl-4">
            <div
              className="bg-white rounded-3 overflow-hidden shadow-sm h-100"
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: tipoRelatorio === 'gestantes' ? `2px solid ${configsCards['gestantes'].border}` : '1px solid #e2e8f0',
              }}
              onClick={() => setTipoRelatorio('gestantes')}
            >
              <div className="d-flex align-items-center gap-2 p-3" style={{ backgroundColor: configsCards['gestantes'].bg }}>
                <Users size={20} className={configsCards['gestantes'].iconClass} />
                <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>Gestantes Cadastradas</span>
              </div>
              <div className="p-3">
                <p className="text-muted mb-0" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  Listagem completa de todas as gestantes cadastradas no sistema
                </p>
              </div>
            </div>
          </div>

          {/* GESTANTES ALTO RISCO */}
          <div className="col-md-6 col-xl-4">
            <div
              className="bg-white rounded-3 overflow-hidden shadow-sm h-100"
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: tipoRelatorio === 'alto-risco' ? `2px solid ${configsCards['alto-risco'].border}` : '1px solid #e2e8f0',
              }}
              onClick={() => setTipoRelatorio('alto-risco')}
            >
              <div className="d-flex align-items-center gap-2 p-3" style={{ backgroundColor: configsCards['alto-risco'].bg }}>
                <TrendingUp size={20} className={configsCards['alto-risco'].iconClass} />
                <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>Gestantes Alto Risco</span>
              </div>
              <div className="p-3">
                <p className="text-muted mb-0" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  Relatório específico de gestantes classificadas como alto risco
                </p>
              </div>
            </div>
          </div>

          {/* CONSULTAS REALIZADAS */}
          <div className="col-md-6 col-xl-4">
            <div
              className="bg-white rounded-3 overflow-hidden shadow-sm h-100"
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: tipoRelatorio === 'consultas' ? `2px solid ${configsCards['consultas'].border}` : '1px solid #e2e8f0',
              }}
              onClick={() => setTipoRelatorio('consultas')}
            >
              <div className="d-flex align-items-center gap-2 p-3" style={{ backgroundColor: configsCards['consultas'].bg }}>
                <Calendar size={20} className={configsCards['consultas'].iconClass} />
                <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>Consultas Realizadas</span>
              </div>
              <div className="p-3">
                <p className="text-muted mb-0" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  Relatório de consultas pré-natais realizadas por período
                </p>
              </div>
            </div>
          </div>

          {/* ENCAMINHAMENTOS */}
          <div className="col-md-6 col-xl-4">
            <div
              className="bg-white rounded-3 overflow-hidden shadow-sm h-100"
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: tipoRelatorio === 'encaminhamentos' ? `2px solid ${configsCards['encaminhamentos'].border}` : '1px solid #e2e8f0',
              }}
              onClick={() => setTipoRelatorio('encaminhamentos')}
            >
              <div className="d-flex align-items-center gap-2 p-3" style={{ backgroundColor: configsCards['encaminhamentos'].bg }}>
                <FileText size={20} className={configsCards['encaminhamentos'].iconClass} />
                <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>Encaminhamentos</span>
              </div>
              <div className="p-3">
                <p className="text-muted mb-0" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  Relatório de encaminhamentos para especialistas
                </p>
              </div>
            </div>
          </div>

          {/* POR UNIDADE DE SAÚDE */}
          <div className="col-md-6 col-xl-4">
            <div
              className="bg-white rounded-3 overflow-hidden shadow-sm h-100"
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: tipoRelatorio === 'unidade' ? `2px solid ${configsCards['unidade'].border}` : '1px solid #e2e8f0',
              }}
              onClick={() => setTipoRelatorio('unidade')}
            >
              <div className="d-flex align-items-center gap-2 p-3" style={{ backgroundColor: configsCards['unidade'].bg }}>
                <Filter size={20} className="text-purple" />
                <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>Por Unidade de Saúde</span>
              </div>
              <div className="p-3">
                <p className="text-muted mb-0" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  Relatório filtrado por unidade básica de saúde
                </p>
              </div>
            </div>
          </div>

          {/* RELATÓRIO PERSONALIZADO */}
          <div className="col-md-6 col-xl-4">
            <div
              className="bg-white rounded-3 overflow-hidden shadow-sm h-100"
              style={{
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                border: tipoRelatorio === 'personalizado' ? `2px solid ${configsCards['personalizado'].border}` : '1px solid #e2e8f0',
              }}
              onClick={() => setTipoRelatorio('personalizado')}
            >
              <div className="d-flex align-items-center gap-2 p-3" style={{ backgroundColor: configsCards['personalizado'].bg }}>
                <FileSpreadsheet size={20} className="text-pink" />
                <span className="fw-bold text-dark" style={{ fontSize: '14px' }}>Relatório Personalizado</span>
              </div>
              <div className="p-3">
                <p className="text-muted mb-0" style={{ fontSize: '12px', lineHeight: '1.5' }}>
                  Configure filtros personalizados para seu relatório
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SEÇÃO DE FILTROS - MODELO ATUALIZADO */}
        {tipoRelatorio && (
          <div className="rounded-3 overflow-hidden bg-white mb-4 shadow-sm" style={{ border: '1px solid #3b82f6' }}>
            <div className="p-3 d-flex align-items-center gap-2" style={{ backgroundColor: '#eff6ff', color: '#1e3a8a', borderBottom: '1px solid #bfdbfe' }}>
              <Filter size={18} />
              <span className="fw-bold" style={{ fontSize: '15px' }}>Filtros do Relatório</span>
            </div>

            <div className="p-4">
              <div className="row g-4">
                <div className="col-md-6">
                  <Label htmlFor="dataInicio" className="text-secondary small fw-medium mb-1">Data Início </Label>
                  <Input id="dataInicio" type="date" className="rounded-pill border-light-subtle bg-light/30" />
                </div>

                <div className="col-md-6">
                  <Label htmlFor="dataFim" className="text-secondary small fw-medium mb-1">Data Fim </Label>
                  <Input id="dataFim" type="date" className="rounded-pill border-light-subtle bg-light/30" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PRÉ-VISUALIZAÇÃO COMPLETA - ESTILO FOLHA IMPRESSA DE ALTO PADRÃO (LIMPA) */}
        {tipoRelatorio && (
          <div className="rounded-3 overflow-hidden bg-white shadow-sm" style={{ border: '2px solid #22c55e' }}>
            
            {/* Topbar da folha */}
            <div className="p-3 d-flex justify-content-between align-items-center" style={{ backgroundColor: '#f0fdf4', borderBottom: '1px solid #bbf7d0' }}>
              <div className="d-flex align-items-center gap-2" style={{ color: '#14532d' }}>
                <FileText size={18} />
                <span className="fw-bold" style={{ fontSize: '15px' }}>Pré-visualização do Relatório</span>
              </div>

              <div className="d-flex gap-2">
                <Button onClick={handleExportPDF} className="btn btn-danger btn-sm px-3 d-flex align-items-center gap-1 fw-medium" style={{ borderRadius: '6px' }}>
                  <Download size={14} />
                  Exportar PDF
                </Button>

                <Button onClick={handleExportExcel} className="btn btn-success btn-sm px-3 d-flex align-items-center gap-1 fw-medium" style={{ borderRadius: '6px' }}>
                  <Download size={14} />
                  Exportar Excel
                </Button>
              </div>
            </div>

            {/* Corpo Simulando o Documento */}
            <div className="p-4" style={{ backgroundColor: '#f8fafc' }}>
              <div className="bg-white border p-4 mx-auto rounded-2 shadow-sm" style={{ maxWidth: '1100px', borderColor: '#e2e8f0' }}>
                
                {/* Header Interno Governamental */}
                <div className="text-center mb-4 pb-3 border-b" style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <h2 className="fw-bold mb-1" style={{ color: '#1e3a8a', fontSize: '20px', letterSpacing: '-0.5px' }}>
                    Sistema de Gestão de Alto Risco
                  </h2>
                  <p className="text-secondary mb-1 small">
                    Governo da Paraíba - Secretaria de Saúde
                  </p>
                  <span className="text-muted" style={{ fontSize: '11px' }}>
                    Gerado em: 29/05/2026 às 10:07:21
                  </span>
                </div>

                {/* Tabela Formatada Sem Dados */}
                <div className="table-responsive">
                  <table className="table table-hover align-middle" style={{ fontSize: '13px' }}>
                    <thead>
                      <tr className="table-light text-secondary" style={{ borderBottom: '2px solid #e2e8f0' }}>
                        <th className="fw-semibold py-3 ps-3">Nome</th>
                        <th className="fw-semibold py-3">Idade</th>
                        <th className="fw-semibold py-3">Semanas</th>
                        <th className="fw-semibold py-3 text-center">Risco</th>
                        <th className="fw-semibold py-3">Unidade</th>
                      </tr>
                    </thead>
                    <tbody className="text-dark">
                      <tr>
                        <td colSpan="5" className="text-center py-4 text-muted" style={{ fontStyle: 'italic' }}>
                          Nenhum registro encontrado para os filtros selecionados.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Contadores Zerados */}
                <div className="row text-center mt-5 pt-4" style={{ borderTop: '1px solid #f1f5f9' }}>
                  <div className="col-md-4">
                    <h2 className="fw-bold mb-1" style={{ color: '#2563eb', fontSize: '32px' }}>0</h2>
                    <p className="text-secondary small fw-medium mb-0">Total de Gestantes</p>
                  </div>

                  <div className="col-md-4">
                    <h2 className="fw-bold mb-1" style={{ color: '#dc2626', fontSize: '32px' }}>0</h2>
                    <p className="text-secondary small fw-medium mb-0">Alto Risco</p>
                  </div>

                  <div className="col-md-4">
                    <h2 className="fw-bold mb-1" style={{ color: '#16a34a', fontSize: '32px' }}>0</h2>
                    <p className="text-secondary small fw-medium mb-0">Baixo/Médio Risco</p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* PLACEHOLDER INICIAL */}
        {!tipoRelatorio && (
          <div 
            className="bg-white rounded-3 text-center py-5 d-flex flex-column align-items-center justify-content-center"
            style={{ border: '2px dashed #cbd5e1', minHeight: '280px' }}
          >
            <div className="p-3 bg-light rounded-3 mb-3">
              <FileSpreadsheet size={36} className="text-secondary" style={{ opacity: 0.4 }} />
            </div>
            <h4 className="fw-bold mb-1" style={{ fontSize: '15px', color: '#2b3674' }}>
              Selecione um tipo de relatório acima
            </h4>
            <p className="text-muted mb-0 px-3" style={{ fontSize: '13px', maxWidth: '360px' }}>
              Escolha o relatório que deseja gerar e configure os filtros necessários
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Relatorios