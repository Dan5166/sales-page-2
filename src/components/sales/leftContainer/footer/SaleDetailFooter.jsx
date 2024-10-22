import { useState } from "react";
import Button from "../../../common/Button";

const SaleDetailFooter = ({ cart, handleSaveDraft, client, handleClientChange, handleCartChange, handleClienteChangeText, handleRightContainerTabChange }) => {
  const [document, setDocument] = useState("boleta");

  const handleCancel = () => {
    handleCartChange([]);
    handleClienteChangeText("");
    handleRightContainerTabChange("helper");
  }

  return (
    <div className="sale-detail-footer">
      <div className="sale-detail-count-and-document">
        <div className="sale-detail-count">
          <span>Nr. Lineas: {cart.length} / Tot. Items: {cart.reduce((acc, item) => acc + item.cantidad, 0)}</span>
        </div>
        <div className="sale-detail-document">
          <select name="document" id="document" value={document} onChange={(e) => setDocument(e.target.value)}>
            <option value="boleta">Boleta Manual (No valido al SII)</option>
            <option value="factura">Factura Manual (No valido al SII)</option>
          </select>
        </div>
      </div>
      <div className="sale-detail-client">
        <div className="sale-detail-client-search">
          <input type="text" placeholder="Cliente" value={client} onChange={handleClientChange} />
          <Button type="roundPrimaryButton" iconClass="fa-solid fa-search" />
        </div>
        <div className="sale-detail-total">
          <h2>Total</h2>
          <div className="sale-detail-total-amount">{cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)}</div>
        </div>
      </div>
      <div className="sale-detail-buttons">
        <div className="sale-detail-buttons-left">
          <Button type="cancel" text="Cancelar" iconClass="fa-solid fa-times" iconPosition="right" onClick={handleCancel} />
          <Button type="saveDraft" text="Guardar Borrador" iconClass="fa-regular fa-save" iconPosition="right" onClick={handleSaveDraft} />
        </div>
        <Button type="primary" text="Pagar" iconClass="fa-solid fa-check" iconPosition="right" onClick={() => handleRightContainerTabChange("pay")} />
      </div>
    </div>
  );
};

export default SaleDetailFooter;
