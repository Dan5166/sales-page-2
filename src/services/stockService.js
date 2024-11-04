const BASE_URL = "http://190.114.254.155:8081/api";

/**
 * Simula un retraso para probar loaders.
 * @param {number} ms - Milisegundos de retraso.
 * @returns {Promise<void>}
 */
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Obtiene la lista de productos con retraso simulado.
 * @returns {Promise<Array>} - Lista de productos.
 */
export const getProducts = async () => {
  try {
    // Retrasar la petición para simular un loader
    await delay(2000); // 2 segundos de retraso

    const response = await fetch(`${BASE_URL}/getProducts`);
    if (!response.ok) {
      throw new Error(`Error al obtener productos: ${response.statusText}`);
    }

    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error en getProducts:", error);
    throw error;
  }
};

/**
 * Crea un producto en el sistema.
 * @param {Object} product - Datos del producto a crear.
 * @returns {Promise<Object>} - Producto creado.
 */
export const createProduct = async (product) => {
  try {
    console.log("CREATE PRODUCT:  ", product);
    const response = await fetch(`${BASE_URL}/createProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error(`Error al crear producto: ${response.statusText}`);
    }

    const createdProduct = await response.json();
    return createdProduct;
  } catch (error) {
    console.error("Error en createProduct:", error);
    throw error;
  }
};
