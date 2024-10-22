const ClientForm = ({ client, handleChange, handleSubmit, handleCancel }) => {
    return (
      <form onSubmit={handleSubmit} className="tab-content">
        <div className="form-group">
          <label htmlFor="tipoCliente">Tipo de Cliente</label>
          <select id="tipoCliente" value={client.tipoCliente} onChange={handleChange}>
            <option value="Persona Natural">Persona Natural</option>
            <option value="Empresa">Empresa</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="clienteExtranjero">Cliente Extranjero</label>
          <input
            type="checkbox"
            id="clienteExtranjero"
            checked={client.clienteExtranjero}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="rut">RUT</label>
          <input
            type="text"
            id="rut"
            value={client.rut}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="razonSocial">Razón Social</label>
          <input
            type="text"
            id="razonSocial"
            value={client.razonSocial || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="giro">Giro</label>
          <input
            type="text"
            id="giro"
            value={client.giro}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nombres">Nombres</label>
          <input
            type="text"
            id="nombres"
            value={client.nombres}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="apellidos">Apellidos</label>
          <input
            type="text"
            id="apellidos"
            value={client.apellidos}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="direccion">Dirección</label>
          <input
            type="text"
            id="direccion"
            value={client.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comuna">Comuna</label>
          <input
            type="text"
            id="comuna"
            value={client.comuna}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="ciudad">Ciudad</label>
          <input
            type="text"
            id="ciudad"
            value={client.ciudad}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-mail</label>
          <input
            type="email"
            id="email"
            value={client.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="text"
            id="telefono"
            value={client.telefono}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="nota">Nota</label>
          <textarea
            id="nota"
            value={client.nota}
            onChange={handleChange}
          />
        </div>
        <button type="button" onClick={handleCancel} className="btn btn-danger">
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Guardar Cliente
        </button>
      </form>
    );
  };
  
  export default ClientForm;
  