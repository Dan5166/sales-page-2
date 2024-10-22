import React, { useContext } from "react";
import ClientContext from "../../../context/ClientContext";
import CartContext from "../../../context/CartContext";

const Invoice = ({ cliente, documento, closeModal }) => {
  const { client } = useContext(ClientContext);
  const { cart } = useContext(CartContext);
  return (
    <div className="invoice-container">
      <i className="fa-solid fa-circle-xmark btn-exit" onClick={closeModal}></i>
      <header className="invoice-header">
        <h1>{documento === 0 ? "Factura" : "Boleta"}</h1>
      </header>

      <section className="client-info">
  <h2>Cliente:</h2>
  {cliente && cliente.nombres ? (
    <div>
      <p>{cliente.nombres}</p>
      <p>{cliente.rut}</p>
      <p>{cliente.direccion}</p>
      <p>{cliente.comuna}</p>
    </div>
  ) : (
    client && (
      <div>
        <p>{client.nombres}</p>
        <p>{client.rut}</p>
        <p>{client.direccion}</p>
        <p>{client.comuna}</p>
      </div>
    )
  )}
</section>

      <section className="product-list">
        <h2>Productos:</h2>
        <ul>
          {cart.map((product) => (
            <li key={product.id}>
              <p>{product.nombre}</p>
              <p>Cantidad: {product.cantidad}</p>
              <p>Precio: ${product.precio}</p>
              <p>Subtotal: ${product.precio * product.cantidad}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="total">
        <h2>Total:</h2>
        <p>$100</p>
      </section>
      <button className="btn btn-primary"><i className="fa-solid fa-print"></i> Imprimir</button>
    </div>
  );
};

export default Invoice;
