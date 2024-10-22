import React , { useState } from "react";
import Button from "../../common/Button";
import Cart from "./top/Cart";
import SaleDetailFooter from "./footer/SaleDetailFooter";

const SaleDetail = ({ cart, handleCartChange, handleSearch, handleSaveDraft, client, handleClientChange, handleRightContainerTabChange, handleClienteChangeText }) => {
  const [localSearch, setLocalSearch] = useState("");

  const handleLocalSearch = (e) => {
    const value = String(e.target.value);
    console.log("Local EEEE: ", value);
    setLocalSearch(value);
  };
  

  const submitLocalSearch = () => {
    console.log("LOCALAOCAL:  ",localSearch);
    handleSearch(localSearch);
    setLocalSearch("");
  };

  return (
    <div className="sale-detail">
      <div className="sale-detail-top-container">
        <div className="sku-search">
          <i className="fa-solid fa-barcode"></i>
          <input
            type="text"
            placeholder="Ingresa aqui el producto o servicio"
            onChange={(e) => handleLocalSearch(e)}
            value={localSearch}
          />
          <Button type="productDetail" iconClass="fa-solid fa-search" onClick={submitLocalSearch} />
        </div>
        <Cart cart={cart} handleCartChange={handleCartChange} />
      </div>
      <SaleDetailFooter cart={cart} client={client} handleClientChange={handleClientChange} handleSaveDraft={handleSaveDraft} handleCartChange={handleCartChange} handleClienteChangeText={handleClienteChangeText} handleRightContainerTabChange={handleRightContainerTabChange} />
    </div>
  );
};

export default SaleDetail;
