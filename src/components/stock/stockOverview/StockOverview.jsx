import { useContext, useEffect, useState } from "react";
import { StockContext } from "../../../context/StockContext";
import Button from "../../common/Button";
import Pagination from "./Pagination";

const StockOverview = () => {
  const { products, fetchProducts } = useContext(StockContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedProducts, setPaginatedProducts] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOption, setSortOption] = useState(""); // Opción de ordenación
  const [searchTerm, setSearchTerm] = useState(""); // Estado para la búsqueda

  // Formatear precio con puntos
  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }).format(price);

  // Filtrar productos según el término de búsqueda (por nombre o SKU)
  const filterProducts = (products) =>
    products.filter(
      (product) =>
        product.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.producto_id.toString().includes(searchTerm)
    );

  // Ordenar productos según la opción seleccionada
  const sortProducts = (products) => {
    switch (sortOption) {
      case "precio-asc":
        return [...products].sort((a, b) => a.precio - b.precio);
      case "precio-desc":
        return [...products].sort((a, b) => b.precio - a.precio);
      case "stock-asc":
        return [...products].sort((a, b) => a.stock - b.stock);
      case "stock-desc":
        return [...products].sort((a, b) => b.stock - a.stock);
      case "nombre-asc":
        return [...products].sort((a, b) =>
          a.producto.localeCompare(b.producto)
        );
      case "nombre-desc":
        return [...products].sort((a, b) =>
          b.producto.localeCompare(a.producto)
        );
      default:
        return products;
    }
  };

  useEffect(() => {
    const filteredProducts = filterProducts(products); // Aplicar filtro
    const sortedProducts = sortProducts(filteredProducts); // Aplicar ordenación
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedProducts(sortedProducts.slice(startIndex, endIndex));
  }, [products, currentPage, itemsPerPage, sortOption, searchTerm]);

  const handlePageChange = (newPage) => setCurrentPage(newPage);

  useEffect(() => {
    const filteredProducts = filterProducts(products);
    setTotalPages(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [products, itemsPerPage, searchTerm]);

  const handleRefresh = async () => {
    if (fetchProducts) {
      await fetchProducts();
      setCurrentPage(1);
    }
  };

  return (
    <div className="stock-overview">
      <div className="stock-container">
        <div className="stock-filters">
          <div className="stock-filter">
            <input
              type="text"
              placeholder="Buscar producto"
              className="stock-filter-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button iconClass={"fa-solid fa-search"} type={"search"} />
          </div>

          <div className="stock-filter">
            <Button
              iconClass="fa-solid fa-rotate-right"
              type="refresh"
              onClick={handleRefresh}
            >
              Actualizar
            </Button>
          </div>

          <div className="stock-filter">
            <select
              name="num-rows"
              className="stock-filter-select"
              onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
              value={itemsPerPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>

          <div className="stock-filter">
            <select
              name="sort"
              className="stock-filter-select"
              onChange={(e) => setSortOption(e.target.value)}
              value={sortOption}
            >
              <option value="stock-asc">Ordenar por...</option>
              <option value="precio-asc">Precio: Menor a Mayor</option>
              <option value="precio-desc">Precio: Mayor a Menor</option>
              <option value="stock-asc">Stock: Menor a Mayor</option>
              <option value="stock-desc">Stock: Mayor a Menor</option>
              <option value="nombre-asc">Nombre: A-Z</option>
              <option value="nombre-desc">Nombre: Z-A</option>
            </select>
          </div>
        </div>

        <div className="product-row header">
          <h3 className="product-cell width-40">Producto</h3>
          <h3 className="product-cell width-10">SKU</h3>
          <h3 className="product-cell width-10 text-right">Stock</h3>
          <h3
            className="product-cell width-10 text-right"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            $ unidad
          </h3>
        </div>

        <div className="tabla-stock">
          {paginatedProducts.map((product, index) => {
            const rowBackground = index % 2 === 0 ? "#eeeeee" : "transparent";

            return (
              <div
                className="product-row"
                key={product.id}
                style={{ backgroundColor: rowBackground }}
              >
                <div className="product-cell text-left width-40">
                  <Button
                    iconClass={"fa-solid fa-plus"}
                    type={"productDetail"}
                  />
                  <h3>{product.producto}</h3>
                </div>
                <h3 className="product-cell text-left width-10">
                  {product.producto_id}
                </h3>
                <p className="product-cell text-right width-10">
                  {product.stock}
                </p>
                <p
                  className="product-cell text-right width-10"
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  {formatPrice(product.precio)}
                </p>
              </div>
            );
          })}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default StockOverview;
