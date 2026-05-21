import { useState, useRef } from 'react'

export default function Dropzone({ inputId, onFilesChange }) {
  const [dragging, setDragging] = useState(false)
  const fileRef = useRef()

  const handleDragOver = (e) => { e.preventDefault(); setDragging(true) }
  const handleDragLeave = () => setDragging(false)
  const handleDrop = (e) => {
    e.preventDefault(); setDragging(false)
    const files = Array.from(e.dataTransfer.files)
    onFilesChange?.((prev) => [...prev, ...files])
  }
  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files)
    onFilesChange?.((prev) => [...prev, ...files])
  }

  return (
    <>
      <div
        className={`dropzone d-flex flex-column align-items-center justify-content-center py-4 px-3 rounded-3 ${dragging ? 'dropzone-active' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileRef.current?.click()}
        role="button"
        style={{ border: '2px dashed #ccc', cursor: 'pointer', minHeight: 100, transition: '0.2s' }}
      >
        <i className="bi bi-cloud-upload fs-2 text-muted"></i>
        <p className="mb-0 small text-muted">Arraste arquivos ou clique para anexar</p>
      </div>
      <input ref={fileRef} id={inputId} type="file" className="d-none" multiple onChange={handleFileSelect} />
    </>
  )
}
