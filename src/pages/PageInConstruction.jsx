// src/components/PageInConstruction.jsx
import React from 'react';
import './PageInConstruction.css'; // Asegúrate de crear este archivo CSS.
import { Header } from '../components/layout/Header';

const PageInConstruction = () => {
  return (
    <div className="construction-container">
        <Header />
      <div className="content">
        <i className="fa-solid fa-hard-hat fa-3x bounce"></i>
        <h1 className="title">Página en Construcción</h1>
        <p className="message">
          Estamos trabajando arduamente para traerte esta sección pronto.
          ¡Gracias por tu paciencia!
        </p>
        <div className="progress-bar">
          <div className="progress"></div>
        </div>
      </div>
    </div>
  );
};

export default PageInConstruction;
