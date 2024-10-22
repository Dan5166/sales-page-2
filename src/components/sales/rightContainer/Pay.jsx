import { useEffect, useState } from "react";
import Button from "../../common/Button";

const Pay = ({ cart }) => {
  const [deliveryOption, setDeliveryOption] = useState("entregaEnTienda");
  const [paymentOption, setPaymentOption] = useState("efectivo");
  const [montoFormaPago, setMontoFormaPago] = useState(""); // Cambiar a string
  const [pagos, setPagos] = useState([]);
  const [change, setChange] = useState(0);

  const handleDeliveryOptionChange = (option) => {
    setDeliveryOption(option);
  };

  const handlePaymentOptionChange = (option) => {
    setPaymentOption(option);
  };

  const handleAmountChange = (amount) => {
    setMontoFormaPago(amount); // Permitir que el valor sea un string
  };

  const handleAddPayment = () => {
    const parsedAmount = parseFloat(montoFormaPago);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return; // Validación

    // Agregar pago y limpiar campo
    setPagos([...pagos, { formaPago: paymentOption, monto: parsedAmount }]);
    setMontoFormaPago(""); // Reiniciar a string vacío
  };

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.precio * item.cantidad,
      0
    );

    const paid = pagos.reduce((acc, pago) => acc + pago.monto, 0);
    const restante = total - paid;

    if (restante > 0) {
      setMontoFormaPago(restante.toString()); // Sugerir el restante como string
      setChange(0); // Aún no hay vuelto
    } else {
      setMontoFormaPago(""); // No más por pagar
      setChange(Math.abs(restante)); // Calcular vuelto
    }
  }, [cart, pagos]);

  return (
    <div className="helper pay-container">
      <div className="pay">
        <div className="title">
          <i className="fa-solid fa-dollar-sign"></i>
          <p>Pagar</p>
        </div>
        <label htmlFor="pay">Fecha Venta</label>
        <input type="date" className="date" name="date" id="date" />

        <div className="delivery-options" id="entregaEnTienda">
          <div
            className={`delivery-option ${
              deliveryOption === "entregaEnTienda" ? "selected" : ""
            }`}
            onClick={() => handleDeliveryOptionChange("entregaEnTienda")}
          >
            <i className="fa-solid fa-store"></i>
            <p>Entrega inmediata</p>
          </div>
          <div
            className={`delivery-option ${
              deliveryOption === "despacho" ? "selected" : ""
            }`}
            onClick={() => handleDeliveryOptionChange("despacho")}
          >
            <i className="fa-solid fa-truck"></i>
            <p>Por despachar</p>
          </div>
        </div>

        <div className="payment-options">
          <select
            name="payment"
            id="payment"
            value={paymentOption}
            onChange={(e) => handlePaymentOptionChange(e.target.value)}
          >
            <option value="efectivo">Efectivo</option>
            <option value="debito">Tarjeta</option>
            <option value="transferencia">Transferencia</option>
          </select>

          <div className="monto-container">
            <label htmlFor="monto">Monto Forma de Pago</label>
            <input
              type="number"
              className="monto"
              name="monto"
              id="monto"
              value={montoFormaPago}
              onChange={(e) => handleAmountChange(e.target.value)}
              placeholder="0" // Puedes agregar un placeholder si quieres
            />
          </div>

          <Button
            type="secondary"
            text="Agregar forma de pago"
            iconClass="fa-solid fa-plus"
            onClick={handleAddPayment}
            style={{ alignSelf: "flex-end" }}
          />
        </div>

        {pagos.length > 0 && (
          <div className="pagos">
            {pagos.map((pago, index) => (
              <div key={index} className="pago">
                <div className="payment-method-info">
                  <p>{pago.formaPago}</p>
                  <p>{pago.monto}</p>
                </div>
                <i className="fa-solid fa-trash"></i>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="payment-summary">
        <div className="payment-info">
          <div className="payment-item">
            <p>Total</p>
            <div className="total-to-pay-amount">
              {cart.reduce((acc, item) => acc + item.precio * item.cantidad, 0)}
            </div>
          </div>
          <div className="payment-item">
            <p>Pagado</p>
            <div className="paid-amount">
              {pagos.reduce((acc, pago) => acc + pago.monto, 0)}
            </div>
          </div>
          <div className="payment-item">
            <p>Vuelto</p>
            <div className="change-amount">{change}</div>
          </div>
        </div>

        <Button
          type="primary"
          text="Confirmar Pago"
          iconClass="fa-solid fa-check"
        />
      </div>
    </div>
  );
};

export default Pay;
