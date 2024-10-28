import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import SettingsModal from "../common/modals/SettingsModal";
import "./Header.css";
import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

export const Header = ({ submenuList=[] }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation(); // Obtiene la ruta actual
  const [isSubmenuEnabled, setSubmenuEnabled] = useState(true);
  const { logout } = useAuth();

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  // Función para verificar si la ruta es la actual
  const isActive = (path) => (location.pathname === path ? "active" : "");

  return (
    <div
      className={
        isSubmenuEnabled
          ? "header-container"
          : "header-container header-container-without-submenu"
      }
    >
      <header className="header">
        <div className="logo">
          <Link to="/sales" className={isActive("/sellpoint")}>
            <i className="fa-solid fa-store"></i>
            <p>RappyPan</p>
          </Link>
        </div>
        <div className="links">
          <Link to="/sales" className={isActive("/sellpoint")}>
            Punto de venta
          </Link>
          <Link to="/stock" className={isActive("/stock")}>
            Stock
          </Link>
          <Link to="/reports" className={isActive("/reports")}>
            Reportes
          </Link>
        </div>
        <div className="user-links">
          <Button type="help">¡Ayuda!</Button>
          <div className="settings-container">
            <i
              className="fa-solid fa-gear roll-animated"
              style={{ fontSize: "25px" }}
              onClick={toggleModal}
            ></i>
            {isModalOpen && <SettingsModal closeModal={toggleModal} />}
          </div>
          <div className="user">
            <i
              className="fa-solid fa-circle-user"
              style={{ fontSize: "25px" }}
            ></i>
            <div className="user-info" onClick={logout}>
              <p>Nombre de usuario</p>
              <p>Casa</p>
            </div>
          </div>
        </div>
      </header>

      {/* Submenu */}
      {isSubmenuEnabled && (
        <header className="header submenu">
          {submenuList.map((item, index) => (
            <div key={index} onClick={item.action} className={item.active ? "submenu-link active" : "submenu-link"}>
              {item.name}
            </div>
          ))}
        </header>
      )}
    </div>
  );
};

export const SellpointHeader = () => {
  const [isSettingsOpen, setSettingsOpen] = useState(false);

  const toggleSettings = () => {
    setSettingsOpen(!isSettingsOpen);
  };

  return (
    <div
      className="header-container sellpoint-header-container"
      style={{
        height: "auto",
        borderBottom: "3px solid #ffb38a",
        boxShadow: "none",
        backgroundColor: "#ffffff",
      }}
    >
      <header
        className="header sellpoint-header"
        style={{ borderBottom: "none" }}
      >
        <div className="links-open-button">
          <button
            onClick={toggleSettings}
            className={
              isSettingsOpen ? "btn-open-menu active" : "btn-open-menu"
            }
          >
            <span>Ventas: casa matriz / user</span>
            <i className="fa-solid fa-chevron-down flecha-abajo-open"></i>
          </button>
          {isSettingsOpen && (
            <div className="submenu-links">
              <Link
                to="/sales"
                className="submenu-item"
                style={{ borderBottom: "1px solid #cccccc" }}
              >
                Reimprimir<i className="fa-solid fa-print"></i>
              </Link>
              <Link
                to="/sales"
                className="submenu-item"
                style={{ color: "#ffb38a" }}
              >
                Punto de venta<i className="fa-regular fa-circle-check"></i>
              </Link>
              <Link to="/stock" className="submenu-item">
                Stock<i className="fa-regular fa-circle-right"></i>
              </Link>
              <Link to="/reports" className="submenu-item">
                Reportes<i className="fa-regular fa-circle-right"></i>
              </Link>
              <Link to="/sales" className="submenu-item">
                Cerrar punto de venta
                <i className="fa-regular fa-circle-xmark"></i>
              </Link>
            </div>
          )}
        </div>
        <div className="logo">
          <Link to="/sales">
            <i className="fa-solid fa-store"></i>
            <p>RappyPan</p>
          </Link>
        </div>
        <div
          className="user-links sellpoint-user-links"
          style={{ backgroundColor: "#ffffff" }}
        >
          <div className="btn-help-question">
            <Link to="/help">
              <i
                className="fa-regular fa-circle-question"
                style={{ fontSize: "25px", color: "#999999" }}
              ></i>
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};
