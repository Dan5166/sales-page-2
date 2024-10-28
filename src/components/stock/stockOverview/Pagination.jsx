const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (newPage) => {
        onPageChange(newPage);
    };

    const getPaginationButtons = () => {
        const buttons = [];
        const maxButtons = 3; // Número máximo de botones a mostrar
        const half = Math.floor(maxButtons / 2);

        // Si hay menos botones que maxButtons, devuelve todas las páginas
        if (totalPages <= maxButtons) {
            console.log('Hay menos botones que maxButtons');
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(i);
            }
            return buttons;
        }

        let startPage = Math.max(1, currentPage - half);
        let endPage = Math.min(totalPages, currentPage + half);

        console.log('startPage:', startPage);
        console.log('endPage:', endPage);
        console.log('totalPages:', totalPages);

        // Agregar elipsis
        if (startPage > 1) {
            console.log('startPage > 1');
            if (startPage > 2){
                buttons.unshift('...');
            }
            buttons.unshift(1);
        }

        // Ajustar si estamos cerca del inicio
        if (startPage === 1) {
            endPage = Math.min(maxButtons, totalPages);
        }
        // Ajustar si estamos cerca del final
        if (endPage === totalPages) {
            startPage = Math.max(1, totalPages - maxButtons + 1);
        }

        // Crear los botones
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(i);
        }

        if (endPage < totalPages) {
            buttons.push('...');
            buttons.push(totalPages);
        }
        console.log(buttons);

        return buttons;
    };

    const paginationButtons = getPaginationButtons();

    return (
        <div className="pagination">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ width: '100px' }}
            >
                Anterior
            </button>
            {paginationButtons.map((page, index) => (
                <button
                    key={index}
                    onClick={() => typeof page === 'number' && handlePageChange(page)}
                    className={currentPage === page ? "active" : ""}
                    disabled={page === '...'} // Deshabilitar elipsis
                >
                    {page}
                </button>
            ))}
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                style={{ width: '100px' }}
            >
                Siguiente
            </button>
        </div>
    );
};

export default Pagination;
