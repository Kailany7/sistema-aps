import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { gestanteService } from "../services";
import { useToast } from "../contexts/ToastContext";
import { extractError } from "../utils/errors";
import PageHeader from "../components/PageHeader";
import CardSection from "../components/CardSection";
import AsyncContent from "../components/AsyncContent";

function AcompanhamentoGestante() {
  const { id } = useParams();
  // "eslint-disable-next-line no-unused-vars"
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [g, setG] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    gestanteService
      .obter(id)
      .then((res) => setG(res.data))
      .catch((err) => addToast(extractError(err), "danger"))
      .finally(() => setLoading(false));
  }, [addToast, id]);

  const hoje = new Date();
  const consultas = g?.consultas || [];
  const futuras = consultas.filter((c) => {
    const dataConsulta = new Date(c.data);

    const dentroInicio = !dataInicio || dataConsulta >= new Date(dataInicio);

    const dentroFim =
      !dataFim || dataConsulta <= new Date(`${dataFim}T23:59:59`);

    return dataConsulta >= hoje && dentroInicio && dentroFim;
  });

  const passadas = consultas.filter((c) => {
    const dataConsulta = new Date(c.data);

    const dentroInicio = !dataInicio || dataConsulta >= new Date(dataInicio);

    const dentroFim =
      !dataFim || dataConsulta <= new Date(`${dataFim}T23:59:59`);

    return dataConsulta < hoje && dentroInicio && dentroFim;
  });
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  return (
    <div className="p-4">
      <PageHeader
        icon="bi-heart-pulse"
        title="Consultas Agendadas"
        subtitle="Confira as próximas consultas pré-natais agendadas e o histórico de atendimentos."
        backRoute="/lista-gestantes"
      >
        <button
          className="btn btn-primary"
          onClick={() =>
            navigate(`/acompanhamento-gestante/${id}/nova-consulta`)
          }
        >
          <i className="bi bi-plus-lg me-1"></i>
          Nova Consulta
        </button>
      </PageHeader>

      <hr />

      <div className="card shadow-sm border-0 mb-4">
  <div className="card-body">
    <div className="row g-3">
      <div className="col-md-6">
        <label className="form-label fw-semibold">
          Data Inicial
        </label>

        <input
          type="date"
          className="form-control"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
        />
      </div>

      <div className="col-md-6">
        <label className="form-label fw-semibold">
          Data Final
        </label>

        <input
          type="date"
          className="form-control"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
        />
      </div>

      <div className="col-12 d-flex justify-content-end mt-2">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => {
            setDataInicio("");
            setDataFim("");
          }}
        >

          <i className="bi bi-x-circle me-2"></i>
          Limpar Filtros
        </button>
      </div>
    </div>
  </div>
</div>

      <div className="row g-4">
        <CardSection
          color="blue"
          icon="bi-calendar-check"
          title="Próximas Consultas Agendadas"
        >
          <AsyncContent
            loading={loading}
            empty={!loading && futuras.length === 0}
            emptyMessage="Nenhuma consulta agendada"
          >
            <div className="d-flex flex-column gap-3">
              {futuras.map((c, i) => {
                const dt = new Date(c.data);
                return (
                  <div
                    key={i}
                    className="consulta-card d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-center gap-3">
                      <div className="consulta-date text-center">
                        <div className="consulta-day">{dt.getDate()}</div>
                        <div className="consulta-month">
                          {meses[dt.getMonth()]}
                        </div>
                      </div>
                      <div>
                        <span className="badge bg-primary bg-opacity-10 text-primary fw-normal">
                          {c.tipo}
                        </span>
                        <p className="mb-0 mt-1 small">{c.profissional}</p>
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-primary rounded-circle"
                      title="Ver detalhes"
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                );
              })}
            </div>
          </AsyncContent>
        </CardSection>

        <CardSection
          color="green"
          icon="bi-clock-history"
          title="Histórico de Atendimentos"
        >
          <AsyncContent
            loading={loading}
            empty={!loading && passadas.length === 0}
            emptyMessage="Nenhum atendimento registrado"
          >
            <div className="d-flex flex-column gap-3">
              {passadas.map((c, i) => (
                <div
                  key={i}
                  className="consulta-card d-flex justify-content-between align-items-center"
                >
                  <div className="d-flex align-items-center gap-3">
                    <div className="consulta-date text-center">
                      <i className="bi bi-check-circle-fill text-success fs-4"></i>
                    </div>
                    <div>
                      <strong className="small">
                        {new Date(c.data).toLocaleDateString("pt-BR")}
                      </strong>
                      <p className="mb-0 small text-muted">
                        {c.observacoes || c.tipo}
                      </p>
                      <small className="text-muted opacity-75">
                        <i className="bi bi-person me-1"></i>
                        {c.profissional}
                      </small>
                    </div>
                  </div>
                  <button
                    className="btn btn-sm btn-outline-success rounded-circle"
                    title="Ver detalhes"
                  >
                    <i className="bi bi-chevron-right"></i>
                  </button>
                </div>
              ))}
            </div>
          </AsyncContent>
        </CardSection>
      </div>
    </div>
  );
}

export default AcompanhamentoGestante;
