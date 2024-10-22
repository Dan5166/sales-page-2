import React, { useState, useContext, useEffect } from 'react';
import Button from '../../common/Button';
import { StockContext } from '../../../context/StockContext';

const ProductDetailsForm = ({toggleContainerClasses, containerStates, anadirProducto}) => {
  const { addProduct } = useContext(StockContext); // Obtiene la función addProduct del contexto
  const [errors, setErrors] = useState({}); // Estado para los errores
  const [addFormValues, setAddFormValues] = useState({
    producto: '',
    active: 1, // Activo por defecto
    precio: 0,
    categoria_id: 1,
    stock: 0,
    created_by: 'admin',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
      created_by: 'Admin', // Aquí defines el valor fijo de created_by
    }));
  };
  

  const cancelForm = () => {
    toggleContainerClasses();
  };

  const validateForm = () => {
    let errors = {};
    let formIsValid = true;

    if (!addFormValues.producto) {
      formIsValid = false;
      errors["producto"] = "Por favor, ingrese un nombre.";
    }

    if (!addFormValues.precio) {
      formIsValid = false;
      errors["precio"] = "Por favor, ingrese un precio.";
    }

    if (!addFormValues.stock) {
      formIsValid = false;
      errors["stock"] = "Por favor, ingrese un stock.";
    }

    setErrors(errors);
    return formIsValid;
  };


  const saveForm = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      try {
        anadirProducto(addFormValues);
        toggleContainerClasses();
        console.log('Producto agregado exitosamente');
      } catch (error) {
        console.error('Error al agregar producto:', error.message);
      }
    } else {
      console.log('Formulario inválido:', errors);
    }
  };

  /*
try {
        await addProduct({
          producto: addFormValues.producto,
          active: addFormValues.active,
          precio: addFormValues.precio,
          categoria_id: addFormValues.categoria_id,
          stock: addFormValues.stock,
          created_by: addFormValues.created_by,
        });
}
  */
  

  useEffect(() => {
    console.log('addFormValues: ', addFormValues);
  }, [addFormValues]);

  return (
    <div className={`right-container ${containerStates.right ? "active" : "right-container"}`}>
      <form action="" method="post" className="formulario-detalles-producto">
        <div className="form-group">
          <label htmlFor="producto">Producto</label>
          <input
            id="producto"
            name="producto" // Agrega el atributo name
            type="text"
            className="txt150"
            maxLength="20"
            placeholder="Nombre general (Ejemplo: Polera)"
            onChange={handleInputChange}
            value={addFormValues.producto || ''}
          />
          {errors.producto && <span className="error"><i className="fa-solid fa-exclamation-circle"></i> {errors.producto}</span>} {/* Muestra el error */}
        </div>
        <div className="form-group">
          <label htmlFor="active">Activo</label>
          <select id="active" name="active" className="txt150" onChange={handleInputChange} value={addFormValues.active || ''}>
            <option value="1">Sí</option>
            <option value="0">No</option>
          </select>
          {errors.active && <span className="error"><i className="fa-solid fa-exclamation-circle"></i> {errors.active}</span>} {/* Muestra el error */}
        </div>
        <div className="form-group">
          <label htmlFor="precio">Precio (Peso Chileno)</label>
          <input
            id="precio"
            name="precio" // Agrega el atributo name
            type="number"
            className="txt150"
            maxLength="20"
            onChange={handleInputChange}
            value={addFormValues.precio || 0} // Agrega el valor del input
          />
          {errors.precio && <span className="error"><i className="fa-solid fa-exclamation-circle"></i> {errors.precio}</span>} {/* Muestra el error */}
        </div>
        <div className="form-group">
          <label htmlFor="categoria_id">Categoría</label>
          <select id="categoria_id" name="categoria_id" className="txt150" onChange={handleInputChange} value={addFormValues.categoria_id || ''}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          {errors.categoria_id && <span className="error"><i className="fa-solid fa-exclamation-circle"></i> {errors.categoria_id}</span>} {/* Muestra el error */}
        </div>
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            name="stock" // Agrega el atributo name
            type="number"
            className="txt150"
            maxLength="20"
            onChange={handleInputChange}
            value={addFormValues.stock || 0} // Agrega el valor del input
            placeholder="Cantidad en stock"
          />
          {errors.stock && <span className="error"><i className="fa-solid fa-exclamation-circle"></i> {errors.stock}</span>} {/* Muestra el error */}
        </div>
      </form>
      <div className="btn-group">
        <Button type={"primary"} iconClass={"fa-solid fa-plus"} onClick={saveForm}>
          Guardar
        </Button>
        <Button type={"secondary"} onClick={cancelForm} iconClass={"fa-solid fa-times"}>
          Cancelar
        </Button>
      </div>
    </div>
  );
};

export default ProductDetailsForm;
