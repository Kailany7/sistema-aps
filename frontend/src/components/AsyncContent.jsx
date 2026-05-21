export default function AsyncContent({ loading, error, empty, children, emptyMessage }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status">
          <span className="visually-hidden">Carregando...</span>
        </div>
      </div>
    )
  }

  if (error) {
    return <p className="text-center text-danger py-4">{error}</p>
  }

  if (empty) {
    return <p className="text-center text-muted py-4">{emptyMessage || 'Nenhum registro encontrado'}</p>
  }

  return children
}
