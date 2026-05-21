import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const menuItems = [
  { icon: 'bi-house-door', label: 'Início', route: '/dashboard' },
  { icon: 'bi-person-plus', label: 'Cadastro de Gestantes', route: '/cadastro-gestante' },
  { icon: 'bi-people', label: 'Lista de Gestantes', route: '/lista-gestantes' },
  { icon: 'bi-heart-pulse', label: 'Acompanhamento Pré-Natal', route: '#' },
  { icon: 'bi-send', label: 'Encaminhamentos', route: '/encaminhamentos' },
  { icon: 'bi-graph-up', label: 'Relatórios', route: '#' },
]

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="d-flex vh-100" style={{ overflow: 'hidden' }}>
      <aside className={`sidebar d-flex flex-column ${collapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header d-flex align-items-center justify-content-between p-3">
          {!collapsed && (
            <img
              src="/logo-governo-pb.png"
              alt="Governo da Paraíba"
              className="logo-governo"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate('/dashboard')}
            />
          )}
          <button
            className="btn btn-sm btn-outline-secondary border-0"
            onClick={() => setCollapsed(!collapsed)}
          >
            <i className={`bi ${collapsed ? 'bi-list' : 'bi-x-lg'}`}></i>
          </button>
        </div>

        <hr className="sidebar-divider my-0" />

        <nav className="flex-grow-1">
          <ul className="nav flex-column px-2">
            {menuItems.map((item) => (
              <li className="nav-item" key={item.label}>
                <button className="nav-link sidebar-link d-flex align-items-center gap-3 w-100" onClick={() => navigate(item.route)}>
                  <i className={`bi ${item.icon} sidebar-icon`}></i>
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="sidebar-footer p-3">
          <button
            className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center gap-2 sair-btn"
            onClick={() => navigate('/login')}
          >
            <i className="bi bi-box-arrow-right"></i>
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      <div className="d-flex flex-column flex-grow-1" style={{ overflow: 'hidden', minWidth: 0 }}>
        <main className="flex-grow-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default MainLayout
