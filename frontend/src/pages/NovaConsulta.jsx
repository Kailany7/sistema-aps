import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { consultaService } from "../services";
import { useToast } from "../contexts/ToastContext";
import { extractError } from "../utils/errors";
import PageHeader from "../components/PageHeader";

function NovaConsulta() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToast } = useToast();
  const [form, setForm] = useState({
    data: "",
    tipo: "",
    profissional: "",
    semanaGestacional: "",
    peso: "",
    pressaoArterial: "",
    observacoes: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await consultaService.criar({ gestanteId: id, ...form });
      addToast("Consulta salva com sucesso!", "success");
      navigate(`/acompanhamento-gestante/${id}`);
    } catch (err) {
      addToast(extractError(err), "danger");
    }
  }

  return (
    <div className="p-4">
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
          <form onSubmit={handleSubmit}>
            <div className="row g-4">
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Data da Consulta *
                </label>
                <input
                  type="date"
                  name="data"
                  className="form-control form-control-lg"
                  required
                  value={form.data}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Tipo de Consulta *
                </label>
                <select
                  name="tipo"
                  className="form-select form-select-lg"
                  required
                  value={form.tipo}
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  <option>Pré-Natal</option>
                  <option>Retorno</option>
                  <option>Emergência</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Idade Gestacional (semanas)
                </label>
                <input
                  type="number"
                  name="semanaGestacional"
                  className="form-control form-control-lg"
                  placeholder="Ex: 32"
                  value={form.semanaGestacional}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Peso (kg)</label>
                <input
                  type="number"
                  step="0.1"
                  name="peso"
                  className="form-control form-control-lg"
                  placeholder="Ex: 68.5"
                  value={form.peso}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Pressão Arterial
                </label>
                <input
                  type="text"
                  name="pressaoArterial"
                  className="form-control form-control-lg"
                  placeholder="Ex: 120/80"
                  value={form.pressaoArterial}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Profissional *
                </label>
                <input
                  type="text"
                  name="profissional"
                  placeholder="Nome do profissional"
                  className="form-control form-control-lg"
                  required
                  value={form.profissional}
                  onChange={handleChange}
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Observações</label>
                <textarea
                  name="observacoes"
                  rows={5}
                  placeholder="Observações gerais, caso haja alguma informação adicional relevante para a consulta."
                  className="form-control form-control-lg"
                  value={form.observacoes}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>

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
