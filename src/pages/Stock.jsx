import { Header } from "../components/layout/Header";
import StockForm from "../components/stock/leftContainer/StockForm";
import ProductDetailsForm from "../components/stock/rightContainer/ProductDetailsForm";
import StockMain from "../components/stock/StockMain";

const Stock = () => {
  return (
    <section className="stock">
        <Header />
        <StockMain />
    </section>
  );
};

export default Stock;
