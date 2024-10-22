import { useEffect } from "react";
import Button from "../../../common/Button";

const Drafts = ({ drafts, handleCartChange, cart, handleClienteChangeText }) => {
    const handleSelectDraft = (draft) => {
        handleCartChange(draft.cart);
        handleClienteChangeText(draft.client);
    };
  return (
    <div className="drafts">
      <div className="drafts-list">
        {drafts && drafts.length > 0 ? (
          drafts.map((draft, index) => (
            <div key={draft.id} className="draft-item">
              <div>
                <p className="id">{"Id: " + draft.id}</p>
                <p className="client">{draft.client}</p>
                <div className="draft-info">
                  <p className="date">{draft.date}</p>
                </div>
              </div>
              <div className="draft-buttons">
                <Button type="productDetail" iconClass="fa-solid fa-check" onClick={() => handleSelectDraft(draft)} />
                <Button
                  type="productDetail"
                  iconClass="fa-solid fa-trash-can"
                />
              </div>
            </div>
          ))
        ) : (
          <p>No se encontraron borradores.</p>
        )}
      </div>
    </div>
  );
};

export default Drafts;
