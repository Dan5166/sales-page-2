import { useContext, useEffect, useState } from "react";
import Button from "../../common/Button";
import Products from "./tabs/Products";
import Drafts from "./tabs/Drafts";
import { StockContext } from "../../../context/StockContext";

const Helper = ({ handleCartChange, cart, searchTerm, handleSearch, drafts, handleClienteChangeText }) => {
  const { products } = useContext(StockContext);
  
  const [tab, setTab] = useState("featured");
  const [stock, setStock] = useState(products);

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

  useEffect(() => {
    setStock(products);
  }, [products]);

  return (
    <div className="helper">
      <div className="title">
        {tab === "featured" && (
          <i className="fa-solid fa-star"></i>)}
        {tab === "drafts" && (
          <i className="fa-solid fa-file"></i>)}
        {tab === "products" && (
          <i className="fa-solid fa-table-cells"></i>)}
        {tab === "featured" && (
          <p>Destacados y mas Vendidos</p>)}
        {tab === "drafts" && (
          <p>Borradores de Venta</p>)}
        {tab === "products" && (
          <p>Productos/Servicios</p>)}
      </div>
      <div className="searchBar">
        <input type="text" placeholder="Buscar" value={searchTerm} onChange={(e) => handleSearch(e.target.value)} />
        <Button type="productDetail" iconClass="fa-solid fa-search" />
      </div>
      <div className="product-list-container">
        {tab === "featured" && (
          <Products stock={stock} type="featured" handleAddToCart={handleAddToCart} searchTerm={searchTerm} />
        )}
        {tab === "drafts" && (
          <Drafts drafts={drafts} handleCartChange={handleCartChange} cart={cart} handleClienteChangeText={handleClienteChangeText} />
        )}
        {tab === "products" && (
          <Products stock={stock} type="products" handleAddToCart={handleAddToCart} searchTerm={searchTerm} />
        )}
      </div>
      <div className="tabs">
        <Button type={tab === "featured" ? "productDetail" : "tabButton"} iconClass="fa-solid fa-star" onClick={() => setTab("featured")} />
        <Button type={tab === "drafts" ? "productDetail" : "tabButton"} iconClass="fa-solid fa-file" onClick={() => setTab("drafts")} />
        <Button type={tab === "products" ? "productDetail" : "tabButton"} iconClass="fa-solid fa-table-cells" onClick={() => setTab("products")} />
      </div>
    </div>
  );
};

export default Helper;
