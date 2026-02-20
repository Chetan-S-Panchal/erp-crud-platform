// --- Milestone 6

import React, { useEffect } from "react";
import ReactDOM from "react-dom";

export default function Modal({ children, onClose }) {
  useEffect(() => {
    const handler = e => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return ReactDOM.createPortal(
    <div style={overlayStyle}>
      <div style={modalStyle}>
        {children}
      </div>
    </div>,
    document.body
  );
}

/* ================= STYLES ================= */

const overlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999
};

const modalStyle = {
  background: "#ffffff",
  padding: 20,
  minWidth: 420,
  borderRadius: 6,
  boxShadow: "0 6px 20px rgba(0,0,0,0.35)"
};
