import Button from "../../../common/Button";
import "./Cart.css";

const Cart = ({ cart, handleCartChange }) => {
  const handleAddToCart = (product) => {
    // Si el producto ya esta en el carrito, aumentar la cantidad
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.producto_id === product.producto_id);
    if (index !== -1) {
      newCart[index].cantidad += 1;
    } else {
      newCart.push({ ...product, cantidad: 1 });
    }
    handleCartChange(newCart);
  };
  const handleMinusFromCart = (product) => {
    // Si el producto ya esta en el carrito, disminuir la cantidad
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.producto_id === product.producto_id);
    // imprimimos el tipo de dato de index
    if (newCart[index].cantidad <= 1) {
      console.log("No se puede disminuir más la cantidad");
      return;
    }
    else {
      console.log("Disminuyendo cantidad" + cart[index].cantidad);
      if (index !== -1) {
        newCart[index].cantidad -= 1;
      } else {
        newCart.push({ ...product, cantidad: 1 });
      }
      handleCartChange(newCart);
    }
  };
  const handleRemoveFromCart = (product) => {
    const newCart = cart.filter((item) => item.producto_id !== product.producto_id);
    handleCartChange(newCart);
  };
  const onChangeProductQuantity = (e, product) => {
    // Si el numero es menor a 1, no hacer nada
    if (e.target.value < 1) {
      return;
    }
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.producto_id === product.producto_id);
    newCart[index].cantidad = e.target.value;
    handleCartChange(newCart);
  };
  return (
    <div className="cart">
      <div className="cart-items">
        {cart.map((item) => (
          <div className="product-row-sellpoint" key={item.producto_id}>
            <div className="product-information-left-container">
              <div className="product-cell-sellpoint">
                <div className="buttons">
                  <Button
                    onClick={() => handleAddToCart(item)}
                    type="roundPrimaryButton"
                    iconClass="fa-solid fa-plus"
                  />
                  <Button
                  onClick={() => handleMinusFromCart(item)}
                    type="roundPrimaryButton"
                    iconClass="fa-solid fa-minus"
                  />
                </div>
              </div>
              <input
                type="number"
                value={item.cantidad}
                onChange={(e) => onChangeProductQuantity(e, item)}
                className="product-cell-sellpoint"
              />
              <div className="product-cell-sellpoint">
                <h3 className="product-cell-sellpoint">{item.producto}</h3>
                <p className="product-cell-sellpoint">$/unidad: ${item.precio}</p>
              </div>
            </div>

            <div className="product-information-right-container">
              <p
                style={{ width: "10%", textAlign: "right" }}
                className="product-cell-sellpoint"
              >
                ${item.precio * item.cantidad}
              </p>

              <i
                className="fa-regular fa-trash-can"
                style={{
                  width: "10%",
                  textAlign: "right",
                  cursor: "pointer",
                  color: "#707070",
                  fontSize: "15px",
                }}
                onClick={() => handleRemoveFromCart(item)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
