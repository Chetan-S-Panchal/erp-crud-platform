// --- Milestone 6

import React, { useEffect } from "react";
import "./modal.css";   // make sure this is correct path

export default function Modal({ children, onClose }) {

  useEffect(() => {
    const escHandler = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopImmediatePropagation();
        onClose();
      }
    };

    window.addEventListener("keydown", escHandler, true);

    // cleanup function
    return () => {
      window.removeEventListener("keydown", escHandler, true);
    };
  }, [onClose]);

  // ✅ JSX must be OUTSIDE useEffect
  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        {children}
      </div>
    </div>
  );
}
