import { useNavigate, useParams } from 'react-router-dom'

function NovaConsulta() {
  const navigate = useNavigate()
  const { id } = useParams()

  function handleSubmit(e) {
    e.preventDefault()

    // futura lógica de salvar consulta

    alert('Consulta salva com sucesso!')
  }

  return (
    
    <div className="container-fluid py-4">
      <div
        className="bg-white rounded-4 shadow-sm border-top border-4 p-4"
        style={{ borderTopColor: '#8B5CF6' }}
      >
        {/* Título */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3
              className="fw-bold mb-1"
              style={{ color: '#5B21B6' }}
            >
              Registrar Nova Consulta
            </h3>

            <p className="text-muted mb-0">
              Preencha os dados da consulta pré-natal
            </p>
          </div>

          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              navigate(`/acompanhamento-gestante/${id}`)
            }
          >
            <i className="bi bi-arrow-left me-2"></i>
            Voltar
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            {/* Data */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Data da Consulta *
              </label>

              <input
                type="date"
                className="form-control form-control-lg"
                required
              />
            </div>

            {/* Tipo */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Tipo de Consulta *
              </label>

              <select
                className="form-select form-select-lg"
                required
              >
                <option value="">
                  Selecione...
                </option>

                <option>
                  Pré-Natal
                </option>

                <option>
                  Retorno
                </option>

                <option>
                  Emergência
                </option>
              </select>
            </div>

            {/* Peso */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Peso (kg)
              </label>

              <input
                type="text"
                placeholder="Ex: 68"
                className="form-control form-control-lg"
              />
            </div>

            {/* Pressão */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Pressão Arterial
              </label>

              <input
                type="text"
                placeholder="Ex: 120/80"
                className="form-control form-control-lg"
              />
            </div>

            {/* BCF */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                BCF (Batimentos Cardíacos Fetais)
              </label>

              <input
                type="text"
                placeholder="Ex: 140 bpm"
                className="form-control form-control-lg"
              />
            </div>

            {/* Altura uterina */}
            <div className="col-md-6">
              <label className="form-label fw-semibold">
                Altura Uterina (cm)
              </label>

              <input
                type="text"
                placeholder="Ex: 24"
                className="form-control form-control-lg"
              />
            </div>

            {/* Profissional */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                Profissional *
              </label>

              <input
                type="text"
                placeholder="Nome do profissional"
                className="form-control form-control-lg"
                required
              />
            </div>

            {/* Observações */}
            <div className="col-12">
              <label className="form-label fw-semibold">
                Observações e Evolução *
              </label>

              <textarea
                rows={5}
                placeholder="Descrição da consulta, queixas, conduta..."
                className="form-control form-control-lg"
                required
              ></textarea>
            </div>
          </div>

          {/* Botões */}
          <div className="d-flex justify-content-end gap-3 mt-5">
            <button
              type="button"
              className="btn btn-light border px-4 py-2"
              onClick={() =>
                navigate(`/acompanhamento-gestante/${id}`)
              }
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="btn text-white fw-semibold px-4 py-2"
              style={{
                backgroundColor: '#9333EA',
                border: 'none',
              }}
            >
              <i className="bi bi-floppy me-2"></i>

              Salvar Consulta
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NovaConsulta