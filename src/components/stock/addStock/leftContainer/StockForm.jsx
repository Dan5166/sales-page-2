import { useEffect, useState, useContext } from "react";
import Button from "../../../common/Button";
import { StockContext } from "../../../../context/StockContext";

const StockForm = ({toggleContainerClasses, containerStates, products}) => {
  // const [containerStates, setContainerStates] = useState({ left: true, right: false });

  const { addProducts } = useContext(StockContext);

  const [stock, setStock] = useState(products);

  const openProductDetailsForm = (product) => {
    console.log("openProductDetailsForm", product);
    toggleContainerClasses();
  };

  const addProductsToStock = (products) => {
    addProducts(products);
  };

  useEffect(() => {
    console.log("PRODUCTS: ", products);
    setStock(products);
  }, [products]);

  return (
    <div className={`left-container ${containerStates.left ? "active" : "left-container"}`}>
      <div className="left">
      <form className="formulario-ingreso-documento">
        <div className="form-group form-group-document">
          <select name="selectedDocumentoRecepcion" id="documento-recepcion">
            <option value="0">Documento de Recepcion</option>
            <option value="1">Factura</option>
            <option value="2">Guía de despacho</option>
          </select>
          <input
            id="num_doc_imagestion"
            type="text"
            className="txt150"
            maxLength="20"
            placeholder="nº documento"
            name="numeroDocumento"
          />
          <i className="fa-regular fa-message"></i>
        </div>
        <div className="form-group form-group-product">
          <div className="input-element">
            <div className="input-with-logo">
              <i className="fa-solid fa-barcode"></i>
              <input
                id="cod_producto"
                name="productCode"
                type="text"
                className="txt150"
                maxLength="20"
                placeholder="producto"
              />
            </div>
          </div>

          <div className="input-element">
            <div className="input-with-logo">
              <input
                id="cantidad"
                name="cantidad"
                type="number"
                className="txt150"
                maxLength="20"
                placeholder="cantidad de ingreso"
                step="1"
              />
            </div>
          </div>

          <div className="input-element">
            <input
              id="costo-neto-unitario"
              type="number"
              className="txt150"
              maxLength="20"
              placeholder="costo neto unitario"
              name="costoNetoUnitario"
            />
          </div>
          <Button
            type="submit"
            className="btn btn-primary"
            iconClass={"fa-solid fa-plus"}
            onClick={(e) => {
              e.preventDefault();
              openProductDetailsForm(e);
            }}
          >
            Agregar
          </Button>
        </div>
      </form>
      <div className="footer-stock">
        <form className="product-list">
          <div className="product-row">
            <div
              className="product-cell width-10 text-left"
            >
              SKU
            </div>
            <div
              className="product-cell width-40 text-left"
            >
              Producto
            </div>
            <div
              className="product-cell width-10 text-right"
            >
              Cantidad
            </div>
            <div
              className="product-cell width-10 text-right"
            >
              $ unidad
            </div>
            <div
              className="product-cell width-10 text-right"
            >
              Subtotal neto
            </div>
            <div
              className="product-cell width-10 text-right"
            >
              &nbsp;
            </div>
            <div
              className="product-cell width-10 text-right"
            >
              &nbsp;
            </div>
          </div>
          <div className="tabla-stock">
            {stock &&
              stock.map((product) => {
                const subtotalNeto = product.precio * product.stock;

                return (
                  <div className="product-row" key={product.id}>
                    <h3
                      className="product-cell text-left width-10"
                    >
                      {/*product.producto_id*/}
                      {1}
                    </h3>
                    <h3
                      className="product-cell text-left width-40"
                    >
                      {product.producto}
                    </h3>
                    <p
                      className="product-cell text-right width-10"
                    >
                      {1}
                    </p>
                    <p
                      className="product-cell text-right width-10"
                    >
                      ${product.precio}
                    </p>
                    <p
                      className="product-cell text-right width-10"
                    >
                      ${subtotalNeto}
                    </p>
                    <p className="product-cell text-right width-10">
                    &nbsp;
                    </p>
                    <p className="product-cell text-right width-10">
                      <i className="fa-solid fa-trash"></i>
                    </p>
                    
                  </div>
                );
              })}
          </div>
        </form>
      </div>
      <Button type={"primary"} iconClass={"fa-solid fa-save"} style={{width: "200px", alignSelf: "end", marginRigth: "20px"}} onClick={() => addProductsToStock(stock)}>
        Guardar
      </Button>
      </div>
      
    </div>
  );
};

export default StockForm;
