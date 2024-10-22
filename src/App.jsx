import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SalePoint from "./pages/SalePoint";
import Stock from "./pages/Stock";
import { StockProvider } from "./context/StockContext";
import PageInConstruction from "./pages/PageInConstruction";

function App() {
  return (
    <StockProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SalePoint />} />
          <Route path="/sales" element={<SalePoint />} />
          <Route path="/stock" element={<Stock />} />
          <Route path="/reports" element={<PageInConstruction />} />
          <Route path="/reception" element={<PageInConstruction />} />
          <Route path="/consumption" element={<PageInConstruction />} />
          <Route path="/help" element={<PageInConstruction />} />
        </Routes>
      </BrowserRouter>
    </StockProvider>
  );
}

export default App;
