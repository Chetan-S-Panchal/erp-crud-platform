import React, { useEffect, useRef } from "react";

export default function BaseModal({
  isOpen,
  title,
  mode,
  children,
  onSave,
  onCancel,
  onDelete,
  isValid = true,
}) {
  const modalRef = useRef(null);
  const cancelBtnRef = useRef(null);

  const isView = mode === "view";
  const isDelete = mode === "delete";
  const isAdd = mode === "add";
  const isEdit = mode === "edit";

  /* ---------------------------------------------------
     FOCUS MANAGEMENT (Initial Focus)
     --------------------------------------------------- */
  useEffect(() => {
    if (!isOpen) return;

    if (isView || isDelete) {
      cancelBtnRef.current?.focus();
      return;
    }

    modalRef.current?.focus();
  }, [isOpen, isView, isDelete]);

  /* ---------------------------------------------------
     FOCUS TRAP (Tab Cycling)
     --------------------------------------------------- */
  useEffect(() => {
  if (!isOpen) return;

  const modalElement = modalRef.current;
  if (!modalElement) return;

  const trapFocus = (e) => {
    if (e.key !== "Tab") return;

    // DELETE MODE → toggle only between Cancel & Confirm
    if (isDelete) {
      const buttons = modalElement.querySelectorAll("button");

      if (buttons.length < 2) return;

      const cancelButton = buttons[0];
      const confirmButton = buttons[1];

      e.preventDefault();

      if (document.activeElement === cancelButton) {
        confirmButton.focus();
      } else {
        cancelButton.focus();
      }

      return;
    }

    // NORMAL MODAL TRAP (Add/Edit/View)
    const focusableElements = modalElement.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement =
      focusableElements[focusableElements.length - 1];

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      }
    } else {
      if (document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  modalElement.addEventListener("keydown", trapFocus);

  return () => {
    modalElement.removeEventListener("keydown", trapFocus);
  };
}, [isOpen, isDelete]);

  /* ---------------------------------------------------
     KEYBOARD SHORTCUTS (Alt Keys)
     --------------------------------------------------- */
  useEffect(() => {
    if (!isOpen) return;

    const handler = (e) => {
      if (!e.altKey) return;

      const key = e.key.toLowerCase();

      if ((isAdd || isEdit) && (key === "s" || key === "u")) {
        e.preventDefault();
        if (isValid) onSave?.();
      }

      if (isDelete && key === "d") {
        e.preventDefault();
        onDelete?.();
      }

      if (key === "c") {
        e.preventDefault();
        onCancel?.();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, isAdd, isEdit, isDelete, isValid, onSave, onDelete, onCancel]);

  if (!isOpen) return null;

  return (
    <div style={overlayStyle}>
      <div
        ref={modalRef}
        tabIndex={-1}
        style={modalStyle}
      >
        {/* Header */}
        <div style={headerStyle}>
          <h2 style={{ margin: 0 }}>{title}</h2>
        </div>

        {/* Body */}
        <div style={bodyStyle}>
          {isDelete ? (
            <>
              {children}
              <div style={deleteWarningStyle}>
                Are you sure you want to delete this record?
              </div>
            </>
          ) : (
            children
          )}
        </div>

        {/* Footer */}
        <div style={footerStyle}>
          {isDelete ? (
            <>
              <button
                ref={cancelBtnRef}
                onClick={onCancel}
              >
                Cancel (Alt+C)
              </button>

              <button
                onClick={onDelete}
                style={deleteButtonStyle}
              >
                Confirm Delete (Alt+D)
              </button>
        </>
          ) : (
            <>
              {!isView && (
                <button
                  onClick={onSave}
                  disabled={!isValid}
                >
                  {isEdit ? "Update (Alt+U)" : "Save (Alt+S)"}
                </button>
              )}

              <button
                ref={cancelBtnRef}
                onClick={onCancel}
              >
                {isView ? "Close (Alt+C)" : "Cancel (Alt+C)"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------ Styles ------------------ */

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalStyle = {
  background: "#fff",
  width: "500px",
  maxWidth: "90%",
  borderRadius: "8px",
  boxShadow: "0 5px 20px rgba(0,0,0,0.3)",
  display: "flex",
  flexDirection: "column",
  outline: "none",
};

const headerStyle = {
  padding: "16px",
  borderBottom: "1px solid #eee",
};

const bodyStyle = {
  padding: "16px",
  flex: 1,
  overflowY: "auto",
};

const footerStyle = {
  padding: "16px",
  borderTop: "1px solid #eee",
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
};

const deleteWarningStyle = {
  marginTop: "16px",
  padding: "12px",
  backgroundColor: "#ffe5e5",
  border: "1px solid #ffb3b3",
  borderRadius: "6px",
  fontWeight: "bold",
  color: "#cc0000",
};

const deleteButtonStyle = {
  backgroundColor: "#d32f2f",
  color: "#fff",
  border: "none",
  padding: "8px 14px",
  borderRadius: "4px",
  cursor: "pointer",
};
