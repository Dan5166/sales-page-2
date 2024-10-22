import { useEffect, useState } from "react";
import Button from "../../../common/Button";

const Products = ({ stock, handleAddToCart, searchTerm="" }) => {
  const [filteredStock, setFilteredStock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Tipo de busqueda: ", searchTerm);
    const filtered = stock.filter((product) =>
      product.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.producto_id.toString().includes(searchTerm)
    );
    setFilteredStock(filtered);
  }, [searchTerm]);

  useEffect(() => {
    if (stock.length > 0) {
      setFilteredStock(stock);
      setLoading(false);
    }
    setFilteredStock(stock);
  }, [stock]);

  useEffect(() => {
    console.log("Loading: ", loading);
  }, [loading]);
  

  return (
    <div className="product-list">
      {filteredStock && filteredStock.length > 0 ? (
        filteredStock.map((product) => (
          <div key={product.producto_id} className="product-item">
            <p className="product">{product.producto}</p>
            <div className="product-info">
              <p className="stock">{"(" + product.stock + ")"}</p>
              <div className="buttons">
                <Button
                  type="productDetail"
                  iconClass="fa-solid fa-dollar-sign"
                />
                {product.stock > 0 && (
                  <Button
                  type="productDetail"
                  iconClass="fa-solid fa-plus"
                  onClick={() => handleAddToCart(product)}
                />
                )}
                
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No se encontraron productos.</p>
      )}
    </div>
  );
};

export default Products;
