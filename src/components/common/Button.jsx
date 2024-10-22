import React from "react";
import classes from "./Button.module.css"; // Importa correctamente el CSS Module

function Button({
  type,
  className = "",
  children,
  style = {},
  onClick,
  text,
  iconClass,
  iconPosition = "left",
}) {
  // Definimos las clases posibles en un objeto
  const buttonTypeClasses = {
    help: classes.btnHelp, // btn-help en CSS pasa a btnHelp en JS
    primary: `${classes.btnBasicShape} ${classes.btnPrimary}`,
    secondary: `${classes.btnBasicShape} ${classes.btnSecondary}`,
    basic: classes.btnBasicShape,
    cancel: `${classes.btnBasicShape} ${classes.btnSecondary} ${classes.btnCancel}`,
    productDetail: `${classes.roundBorderedButton} ${classes.btnProductDetail}`,
    question: `${classes.roundBorderedButton} ${classes.btnQuestion}`,
    search: `${classes.roundButton} ${classes.btnSearch}`,
    saveDraft: `${classes.btnBasicShape} ${classes.btnCancel}`,
    pay: `${classes.btnBasicShape} ${classes.btnPrimary}`,
    tabButton: `${classes.roundBorderedButton} ${classes.btnTabButton}`,
    roundPrimaryButton: `${classes.roundPrimaryButton}`,
    onlyIconButton: `${classes.onlyIconButton}`,
    iconText: `${classes.iconText}`,
    likeASelect: `${classes.btnBasicShape} ${classes.likeASelect}`,
    btnOnlyBordered: `${classes.btnBasicShape} ${classes.btnOnlyBordered}`,
  };

  // Seleccionamos la clase en base al tipo o dejamos vacío si no se pasa tipo
  const buttonClass = buttonTypeClasses[type] || classes.btnBasicShape;

  return (
    <button
      className={`${buttonClass} ${classes.btnMargin} ${className}`}
      style={style}
      onClick={onClick}
    >
      {iconPosition === "left" && iconClass && <i className={iconClass}/>}
      {text && <span>{text}</span>}
      {children && children}
      {iconPosition === "right" && iconClass && <i className={iconClass}/>}
    </button>
  );
}

export default Button;
