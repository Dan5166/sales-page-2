import { Header } from "../components/layout/Header";
import AddStock from "../components/stock/addStock/AddStock";
import { useState } from "react";
import StockOverview from "../components/stock/stockOverview/StockOverview";

const Stock = () => {
  const [stockView, setStockView] = useState('addStock');

  return (
    <section className="stock">
        <Header submenuList={[{ name: 'Agregar stock', action: () => setStockView('addStock') }, { name: 'Ver stock', action: () => setStockView('stockOverview') }]} />
        {stockView === 'addStock' && <AddStock />}
        {stockView === 'stockOverview' && <StockOverview />}
    </section>
  );
};

export default Stock;
