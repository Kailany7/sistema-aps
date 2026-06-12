import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { extractError } from "../utils/errors";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ login: "", senha: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.login, form.senha);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(extractError(err));
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="text-center w-100">
        <h1 className="login-title mb-4">Gestão de Alto Risco</h1>

        <div className="login-card card shadow card-top-login">
          <div className="card-body p-4">
            <h5 className="card-title text-center mb-4 fw-bold">
              Acesso ao Sistema
            </h5>

            <form onSubmit={handleSubmit}>
              <div className="mb-3 text-start">
                <label className="form-label fw-semibold">Login</label>
                <input
                  type="text"
                  name="login"
                  className="form-control"
                  placeholder="Digite seu login"
                  value={form.login}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4 text-start">
                <label className="form-label fw-semibold">Senha</label>
                <input
                  type="password"
                  name="senha"
                  className="form-control"
                  placeholder="Digite sua senha"
                  value={form.senha}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <div className="alert alert-danger py-2 small">{error}</div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 fw-semibold"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner-border spinner-border-sm me-2" role="status" />
                ) : null}
                {loading ? "Entrando..." : "Entrar no Sistema"}
              </button>
            </form>
          </div>
        </div>

        <img
          src="/logo-governo-pb.png"
          alt="Governo da Paraíba"
          className="mt-4"
          style={{ maxHeight: 50 }}
        />
      </div>
    </div>
  );
}

export default Login;
