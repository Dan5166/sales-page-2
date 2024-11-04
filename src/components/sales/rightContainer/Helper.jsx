import { useContext, useEffect, useState } from "react";
import Button from "../../common/Button";
import Products from "./tabs/Products";
import Drafts from "./tabs/Drafts";
import { StockContext } from "../../../context/StockContext";

const Helper = ({ handleCartChange, cart, searchTerm, handleSearch, drafts, handleClienteChangeText }) => {
  const { products, fetchProducts } = useContext(StockContext);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("featured");

  // Manejo del carrito
  const handleAddToCart = (product) => {
    const newCart = [...cart];
    const index = newCart.findIndex((item) => item.producto_id === product.producto_id);
    if (index !== -1) {
      newCart[index].cantidad += 1;
    } else {
      newCart.push({ ...product, cantidad: 1 });
    }
    handleCartChange(newCart);
  };

  // Obtener productos al montar el componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsOb = products; // Llamada al contexto
        setStock(products);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [products]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="helper">
      {/* Título dinámico basado en la pestaña activa */}
      <div className="title">
        {tab === "featured" && <><i className="fa-solid fa-star"></i><p>Destacados y más Vendidos</p></>}
        {tab === "drafts" && <><i className="fa-solid fa-file"></i><p>Borradores de Venta</p></>}
        {tab === "products" && <><i className="fa-solid fa-table-cells"></i><p>Productos/Servicios</p></>}
      </div>

      {/* Barra de búsqueda */}
      <div className="searchBar">
        <input
          type="text"
          placeholder="Buscar"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <Button type="productDetail" iconClass="fa-solid fa-search" />
      </div>

      {/* Loader o contenido basado en la pestaña */}
      <div className="product-list-container">
        {loading ? (
          <div className="loader">Cargando productos...</div>
        ) : (
          <>
            {tab === "featured" && (
              <Products
                stock={stock}
                type="featured"
                handleAddToCart={handleAddToCart}
                searchTerm={searchTerm}
              />
            )}
            {tab === "drafts" && (
              <Drafts
                drafts={drafts}
                handleCartChange={handleCartChange}
                cart={cart}
                handleClienteChangeText={handleClienteChangeText}
              />
            )}
            {tab === "products" && (
              <Products
                stock={stock}
                type="products"
                handleAddToCart={handleAddToCart}
                searchTerm={searchTerm}
              />
            )}
          </>
        )}
      </div>

      {/* Pestañas de navegación */}
      <div className="tabs">
        <Button
          type={tab === "featured" ? "productDetail" : "tabButton"}
          iconClass="fa-solid fa-star"
          onClick={() => setTab("featured")}
        />
        <Button
          type={tab === "drafts" ? "productDetail" : "tabButton"}
          iconClass="fa-solid fa-file"
          onClick={() => setTab("drafts")}
        />
        <Button
          type={tab === "products" ? "productDetail" : "tabButton"}
          iconClass="fa-solid fa-table-cells"
          onClick={() => setTab("products")}
        />
      </div>
    </div>
  );
};

export default Helper;
