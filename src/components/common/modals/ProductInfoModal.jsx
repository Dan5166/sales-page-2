const ProductInfoModal = (product, handleProductInfoModalOpen) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Información del producto</h2>
                    <span className="close">&times;</span>
                </div>
                <div className="modal-body">
                    <div className="product-info">
                        <div className="product-info-details">
                            <h3>{product.producto}</h3>
                            <p>Precio: ${product.precio}</p>
                            <p>Stock: {product.stock}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
    };

export default ProductInfoModal;