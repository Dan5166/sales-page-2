import React, { createContext, useState, useEffect } from "react";
import { getProducts, createProduct } from "../services/stockService";

// Crear el contexto
export const StockContext = createContext();

// Crear el proveedor del contexto
export const StockProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar productos al iniciar
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const productsList = await getProducts();
        setProducts(productsList);
      } catch (error) {
        setError("Error al cargar productos");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Crear un nuevo producto
  const addProduct = async (newProduct) => {
    try {
      console.log("CREATING CONTEXTING PRODUCT:  ", newProduct);
      const createdProduct = await createProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, createdProduct]);
    } catch (error) {
      setError("Error al crear producto");
      console.error(error);
    }
  };

  // Funcion temporal que artificia la carga de varios productos
  const addProducts = async (newProducts) => {
    try {
      newProducts.forEach(async (newProduct) => {
        const createdProduct = await createProduct(newProduct);
        setProducts((prevProducts) => [...prevProducts, createdProduct]);
      });
    } catch (error) {
      setError("Error al crear productos");
      console.error(error);
    }
  };

  return (
    <StockContext.Provider value={{ products, addProduct, loading, error, addProducts }}>
      {children}
    </StockContext.Provider>
  );
};
