import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import SalePoint from "./pages/SalePoint";
import Stock from "./pages/Stock";
import { StockProvider } from "./context/StockContext";
import PageInConstruction from "./pages/PageInConstruction";
import Login from "./pages/Login";
import PrivateRoute from "./components/auth/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <StockProvider>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Login es público */}
            <Route path="/login" element={<Login />} />

            {/* Rutas protegidas */}
            <Route
              path="/*"
              element={
                <PrivateRoute>
                  <ProtectedRoutes />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </StockProvider>
  );
}

function ProtectedRoutes() {
  return (
    <Routes>
      <Route path="/sales" element={<SalePoint />} />
      <Route path="/stock" element={<Stock />} />
      <Route path="/reports" element={<PageInConstruction />} />
      <Route path="/reception" element={<PageInConstruction />} />
      <Route path="/consumption" element={<PageInConstruction />} />
      <Route path="/help" element={<PageInConstruction />} />
    </Routes>
  );
}

export default App;
