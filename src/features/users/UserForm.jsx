/*
// --- Milestone 4 & 5

import React, { useEffect, useRef } from "react";
import GenericForm from "../../core/form/GenericForm";

export default function UserForm({
  mode, // add | edit | view | delete
  values = { name: "", age: "", city: "" },
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

  / ---------- REFS (FOCUS CONTROL) ---------- /
  const firstInputRef = useRef(null);
  const cancelBtnRef = useRef(null);

  / ---------- AUTO FOCUS ---------- /
  useEffect(() => {
    if (isView || isDelete) {
      cancelBtnRef.current?.focus();
    } else {
      firstInputRef.current?.focus();
    }
  }, [mode, isView, isDelete]);

  / ---------- KEYBOARD SHORTCUTS ---------- /

  useEffect(() => {
    const handler = (e) => {
      // Require ALT key
      if (!e.altKey) return;

      const key = e.key.toLowerCase();

      // Save / Update
      if ((isAdd || isEdit) && (key === "s" || key === "u")) {
        e.preventDefault();
        onSave(values);
      }

      // Delete
      if (isDelete && key === "d") {
        e.preventDefault();
        onDelete();
      }

      // Cancel / Close
      if (key === "c") {
        e.preventDefault();
        onCancel();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mode, values, onSave, onDelete, onCancel, isAdd, isEdit, isDelete]);


  / ---------- CHANGE HANDLER ---------- /
  const handleChange = (field, value) => {
    if (!readOnly) {
      onChange(field, value);
    }
  };

  / ---------- FIELD RENDER ---------- /
  const renderField = (label, field, type = "text", ref = null) => (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: "block", fontWeight: 600 }}>
        {label}
      </label>

      <input
        ref={ref}
        type={type}
        value={values[field] ?? ""}
        disabled={readOnly}
        onChange={(e) => handleChange(field, e.target.value)}
        style={{
          width: "100%",
          padding: 6,
          boxSizing: "border-box"
        }}
      />

      {touched[field] && errors[field] && (
        <div style={{ color: "red", fontSize: 12 }}>
          {errors[field]}
        </div>
      )}
    </div>
  );

  / ---------- HEADER ---------- /
  const title =
    isAdd ? "Add New" :
    isEdit ? "Edit" :
    isView ? "View" :
    "Delete";

  return (
    <div style={{ minWidth: 320 }}>
      <h3 style={{ marginBottom: 12 }}>{title}</h3>

      {/ ---------- INPUTS ---------- /}
      {renderField("Name", "name", "text", firstInputRef)}
      {renderField("Age", "age", "number")}
      {renderField("City", "city")}

      {/ ---------- DELETE CONFIRM ---------- /}
      {isDelete && (
        <div style={{ color: "red", marginBottom: 12 }}>
          Sure to Delete the Entry?
        </div>
      )}

      {/ ---------- ACTION BUTTONS ---------- /}
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
            title={isAdd ? "Alt + S" : "Alt + U"}
            onClick={() => onSave(values)}
          >
            {isAdd ? <><u>S</u>ave</> : <><u>U</u>pdate</>}
          </button>
        )}

        {isDelete && (
          <button
            type="button"
            title="Alt + D"
            onClick={onDelete}
          >
            <u>D</u>elete
          </button>
        )}

        <button
          ref={cancelBtnRef}
          type="button"
          title="Alt + C"
          onClick={onCancel}
        >
          {isView ? "Close" : <><u>C</u>ancel</>}
        </button>
      </div>
    </div>
  );
}

*/

import React from "react";
import GenericForm from "../../core/form/GenericForm";

export default function UserForm(props) {
  const fields = [
    { label: "Name", name: "name", type: "text" },
    { label: "Age", name: "age", type: "number" },
    { label: "City", name: "city", type: "text" }
  ];

  const title =
    props.mode === "add"
      ? "Add New"
      : props.mode === "edit"
      ? "Edit"
      : props.mode === "view"
      ? "View"
      : "Delete";

  return (
    <GenericForm
      {...props}
      title={title}
      fields={fields}
    />
  );
}
