import { useState } from "react";
import StockForm from "./leftContainer/StockForm";
import ProductDetailsForm from "./rightContainer/ProductDetailsForm";
import "./StockMain.css";

const StockMain = () => {
    const [containerStates, setContainerStates] = useState({ left: true, right: false });
    const [products, setProducts] = useState([]);

    const toggleContainerClasses = () => {
        setContainerStates({ left: !containerStates.left, right: !containerStates.right });
    };

    const anadirProducto = (newProduct) => {
        console.log("CREATING PRODUCT:  ", newProduct);
        setProducts([...products, newProduct]);
    };

  return (
    <div className="stockMain">
      <StockForm toggleContainerClasses={toggleContainerClasses} containerStates={containerStates} products={products} />
      <ProductDetailsForm toggleContainerClasses={toggleContainerClasses} containerStates={containerStates} anadirProducto={anadirProducto} />
    </div>
  );
};

export default StockMain;
