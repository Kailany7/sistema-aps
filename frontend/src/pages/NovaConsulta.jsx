import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "../components/PageHeader";

function NovaConsulta() {
  const navigate = useNavigate();
  const { id } = useParams();

  function handleSubmit(e) {
    e.preventDefault();

    // futura lógica de salvar consulta

    alert("Consulta salva com sucesso!");
  }

  return (
    <div className="p-4">
      {/* Título e botão de voltar */}
      <div className="d-flex justify-content-between align-items-start">
        <PageHeader
          icon="bi-clipboard-plus"
          title="Registrar Nova Consulta"
          subtitle="Preencha os dados da consulta pré-natal."
        />

        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate(`/acompanhamento-gestante/${id}`)}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Voltar
        </button>
      </div>

      <hr className="my-3" />

      <div className="bg-white rounded-4 shadow-sm overflow-hidden">
        <div
          style={{
            height: "5px",
            backgroundColor: "#0D6EFD",
            width: "100%",
          }}
        />

        <div className="p-4">
          {/* Formulário */}
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              {/* Nome da gestante */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Nome da Gestante *
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Nome completo da gestante"
                  required
                />
              </div>

              {/* CPF da gestante */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  CPF da Gestante *
                </label>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Ex: 123.456.789-00"
                  required
                />
              </div>

              {/* Idade da gestante */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Idade da Gestante *
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Ex: 25"
                  required
                />
              </div>

              {/* Idade gestacional */}
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Idade Gestacional (semanas) *
                </label>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder="Ex: 32"
                  required
                />
              </div>

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

                <select className="form-select form-select-lg" required>
                  <option value="">Selecione...</option>

                  <option>Pré-Natal</option>

                  <option>Retorno</option>

                  <option>Emergência</option>
                </select>
              </div>

              {/* Profissional */}
              <div className="col-12">
                <label className="form-label fw-semibold">Profissional *</label>

                <input
                  type="text"
                  placeholder="Nome do profissional"
                  className="form-control form-control-lg"
                  required
                />
              </div>

              {/* Observações */}
              <div className="col-12">
                <label className="form-label fw-semibold">Observações</label>

                <textarea
                  rows={5}
                  placeholder="Observações gerais, caso haja alguma informação adicional relevante para a consulta."
                  className="form-control form-control-lg"
                ></textarea>
              </div>
            </div>

            {/* Botões */}
            <div className="d-flex justify-content-end gap-3 mt-5">
              <button
                type="button"
                className="btn btn-light border px-4 py-2"
                onClick={() => navigate(`/acompanhamento-gestante/${id}`)}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="btn text-white fw-semibold px-4 py-2"
                style={{
                  backgroundColor: "#9333EA",
                  border: "none",
                }}
              >
                <i className="bi bi-floppy me-2"></i>
                Salvar Consulta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NovaConsulta;
