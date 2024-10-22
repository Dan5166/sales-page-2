import { useEffect, useRef, useState } from "react";

const SettingsModal = ({closeModal}) => {
  const [isActive, setIsActive] = useState(false);
  const divRef = useRef(null); // Crear una referencia para el div

  // Función para manejar el clic fuera del componente
  const handleClickOutside = (event) => {
    if (divRef.current && !divRef.current.contains(event.target)) {
      setIsActive(false); // Cambia el estado si se hace clic fuera del div
      closeModal()
    }
  };
  // useEffect para agregar y eliminar el evento de clic
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  return (
    <div className="modal-container" ref={divRef}>
      <div className="modal-content">
        <span className="close-btn" onClick={()=>{closeModal()}}>
          &times;
        </span>
        <h2>Configuración</h2>
        <form>
          <label>
            Opción 1:
            <input type="text" name="option1" />
          </label>
          <label>
            Opción 2:
            <input type="text" name="option2" />
          </label>
          <button type="submit">Guardar</button>
        </form>
      </div>
    </div>
  );
};

export default SettingsModal;
