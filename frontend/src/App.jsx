import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import MainLayout from './pages/MainLayout'
import Dashboard from './pages/Dashboard'
import CadastroGestante from './pages/CadastroGestante'
import ListaGestantes from './pages/ListaGestantes'
import AcompanhamentoGestante from './pages/AcompanhamentoGestante'
import NovaConsulta from './pages/NovaConsulta'
import ListaEncaminhamentos from './pages/ListaEncaminhamentos'
import NovoEncaminhamento from './pages/NovoEncaminhamento'
import DetalheEncaminhamento from './pages/DetalheEncaminhamento'
import Relatorios from './pages/Relatorios'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cadastro-gestante" element={<CadastroGestante />} />
        <Route path="/lista-gestantes" element={<ListaGestantes />} />
        <Route path="/acompanhamento-gestante/:id" element={<AcompanhamentoGestante />} />
        <Route path="/acompanhamento-gestante/:id/nova-consulta" element={<NovaConsulta />} />
        <Route path="/encaminhamentos" element={<ListaEncaminhamentos />} />
        <Route path="/novo-encaminhamento" element={<NovoEncaminhamento />} />
        <Route path="/encaminhamento/:id" element={<DetalheEncaminhamento />} />
        <Route path="/relatorios" element={<Relatorios />} />
      </Route>
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
