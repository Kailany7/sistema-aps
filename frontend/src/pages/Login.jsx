import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  return (
    <div className="login-container d-flex align-items-center justify-content-center">
      <div className="text-center w-100">
        <h1 className="login-title mb-4">Gestão de Alto Risco</h1>

        <div className="login-card card shadow card-top-login">
          <div className="card-body p-4">
            <h5 className="card-title text-center mb-4 fw-bold">
              Acesso ao Sistema
            </h5>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Login</label>
              <input type="text" className="form-control" placeholder="Digite seu login" />
            </div>

            <div className="mb-4 text-start">
              <label className="form-label fw-semibold">Senha</label>
              <input type="password" className="form-control" placeholder="Digite sua senha" />
            </div>

            <button
              type="submit"
              className="btn btn-primary w-100 fw-semibold"
              onClick={() => navigate('/dashboard')}
            >
              Entrar no Sistema
            </button>
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
  )
}

export default Login
