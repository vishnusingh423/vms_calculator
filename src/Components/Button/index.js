import React from "react";
import "./style.css";

function Button({
  title,
  onClick,
  loading,
  background,
  color,
  disabled,
  type,
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      style={{ backgroundColor: background, color: color }}
      className="custom-btn"
      onClick={onClick}
    >
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        title
      )}
    </button>
  );
}

export default Button;
