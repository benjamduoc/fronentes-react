export default function CampoFormulario({ id, etiqueta, opcional = false, error, columnas = 'col-md-6', children }) {
  return (
    <div className={columnas}>
      <label htmlFor={id} className="form-label">
        {etiqueta}
        {opcional && <span className="text-muted fw-normal"> (opcional)</span>}
      </label>
      {children}
      {error && (
        <div className="invalid-feedback d-block" id={`${id}-error`}>
          {error}
        </div>
      )}
    </div>
  );
}
