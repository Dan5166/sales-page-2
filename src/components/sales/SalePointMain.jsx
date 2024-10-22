import { useEffect, useState } from "react";
import SaleDetail from "./leftContainer/SaleDetail";
import Helper from "./rightContainer/Helper";
import Pay from "./rightContainer/Pay";
import "./SalePointMain.css";
import ProductInfoModal from "../common/modals/ProductInfoModal";

const cartAPI = [
  ];

const SalePointMain = () => {
  const [cart, setCart] = useState(cartAPI);
  const [productInfoModalActive, setProductInfoModalActive] = useState(false);
  const [product, setProduct] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [client, setClient] = useState("");
  const [drafts, setDrafts] = useState([]);

  const [rightContainerTab, setRightContainerTab] = useState("helper");

  const handleRightContainerTabChange = (tab) => {
    setRightContainerTab(tab);
  };

  const handleClientChange = (e) => {
    if (e?.target) {
      setClient(e.target.value);
    } else {
      console.warn("El evento no tiene un target válido.");
    }
  };
  

  const handleClienteChangeText = (client) => {
    setClient(client);
  };

  const handleSearch = (value) => {
    console.log("Buscando: ", value);
    setSearchTerm(value);
  };

  const handleProductInfoModalOpen = () => {
    setProductInfoModalActive(true);
  };

  const handleProductInfoModalClose =() => {
    setProductInfoModalActive(false);
  };

  const handleCartChange = (newCart) => {
    setCart(newCart);
  };

  const handleSaveDraft = () => {
    console.log("Draft saved");
    const draftId = drafts.length + 1;
    const draft = {
      id: draftId,
      cart: cart,
      client: client,
      date: new Date().toLocaleString(),
    };
    setDrafts([...drafts, draft]);
  };

  useEffect(() => {
    console.log(cart);
  }, [cart]);

  useEffect(() => {
    console.log(drafts);
  }
  , [drafts]);

  return (
    <section className="salePointMain">
      <SaleDetail cart={cart} handleCartChange={handleCartChange} handleSearch={handleSearch} handleSaveDraft={handleSaveDraft} client={client} handleClientChange={handleClientChange} drafts={drafts} handleClienteChangeText={handleClienteChangeText} handleRightContainerTabChange={handleRightContainerTabChange} />
      {rightContainerTab === "helper" && (<Helper handleCartChange={handleCartChange} cart={cart} searchTerm={searchTerm} handleSearch={handleSearch} drafts={drafts} handleClienteChangeText={handleClienteChangeText} />)}
      {rightContainerTab === "pay" && (<Pay cart={cart} handleCartChange={handleCartChange} client={client} handleClientChange={handleClientChange} />)}
      {productInfoModalActive && (
        <ProductInfoModal product={product} handleProductInfoModalOpen={handleProductInfoModalOpen} handleProductInfoModalClose={handleProductInfoModalClose} />
      )}
    </section>
  );
};

export default SalePointMain;
