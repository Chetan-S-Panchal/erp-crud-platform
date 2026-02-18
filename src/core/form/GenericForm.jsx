/*
// --- Milestone 4 & 5

import React from "react";

export default function GenericForm({
  schema,
  values,
  onChange,
  disabled = false
}) {
  if (!schema || !Array.isArray(schema.fields)) {
    return <div>Invalid form schema</div>;
  }

  return (
    <div>
      {schema.fields.map(field => (
        <div
          key={field.id}
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "12px"
          }}
        >
          <label
            htmlFor={field.id}
            style={{ fontWeight: "bold", marginBottom: "4px" }}
          >
            {field.label}
          </label>

          <input
            id={field.id}
            type={field.type || "text"}
            value={values[field.id] ?? ""}
            disabled={disabled}
            onChange={e =>
              onChange(field.id, e.target.value)
            }
            style={{
              padding: "6px",
              fontSize: "14px",
              backgroundColor: disabled ? "#f4f4f4" : "white"
            }}
          />
        </div>
      ))}
    </div>
  );
}
*/

import React, { useEffect, useRef } from "react";

export default function GenericForm({
  mode,
  title,
  fields = [],
  values = {},
  errors = {},
  touched = {},
  onChange,
  onSave,
  onDelete,
  onCancel
}) {
  const isAdd = mode === "add";
  const isEdit = mode === "edit";
  const isView = mode === "view";
  const isDelete = mode === "delete";

  const readOnly = isView || isDelete;

  const firstInputRef = useRef(null);
  const cancelBtnRef = useRef(null);

  /* ---------- AUTO FOCUS ---------- */
  useEffect(() => {
    if (readOnly) {
      cancelBtnRef.current?.focus();
    } else {
      firstInputRef.current?.focus();
    }
  }, [mode, readOnly]);

  /* ---------- KEYBOARD SHORTCUTS ---------- */
  useEffect(() => {
    const handler = (e) => {
      if (!e.altKey) return;

      const key = e.key.toLowerCase();

      if ((isAdd || isEdit) && (key === "s" || key === "u")) {
        e.preventDefault();
        onSave(values);
      }

      if (isDelete && key === "d") {
        e.preventDefault();
        onDelete();
      }

      if (key === "c") {
        e.preventDefault();
        onCancel();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode, values, onSave, onDelete, onCancel, isAdd, isEdit, isDelete]);

  /* ---------- FIELD RENDER ---------- */
  const renderField = (field, index) => (
    <div key={field.name} style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontWeight: 600 }}>
        {field.label}
      </label>

      <input
        ref={index === 0 ? firstInputRef : null}
        type={field.type || "text"}
        value={values[field.name] ?? ""}
        disabled={readOnly}
        onChange={(e) => onChange(field.name, e.target.value)}
        style={{
          width: "100%",
          padding: 6,
          boxSizing: "border-box"
        }}
      />

      {touched[field.name] && errors[field.name] && (
        <div style={{ color: "red", fontSize: 12 }}>
          {errors[field.name]}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ minWidth: 320 }}>
      <h3 style={{ marginBottom: 12 }}>{title}</h3>

      {fields.map(renderField)}

      {isDelete && (
        <div style={{ color: "red", marginBottom: 12 }}>
          Sure to Delete the Entry?
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          marginTop: 16
        }}
      >
        {(isAdd || isEdit) && (
          <button
            type="button"
            onClick={() => onSave(values)}
          >
            {isAdd ? "Save" : "Update"}
          </button>
        )}

        {isDelete && (
          <button
            type="button"
            onClick={onDelete}
          >
            Delete
          </button>
        )}

        <button
          ref={cancelBtnRef}
          type="button"
          onClick={onCancel}
        >
          {isView ? "Close" : "Cancel"}
        </button>
      </div>
    </div>
  );
}
