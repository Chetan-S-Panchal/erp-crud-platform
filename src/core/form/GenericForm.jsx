/*
// --- Milestone 6

import React, { useEffect, useRef, useMemo, useCallback, useState } from "react";
import ValidationAdapter from "./ValidationAdapter";

export default function GenericForm({
  mode,
  title,
  fields = [],
  values = {},
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

  / ---------- INTERNAL VALIDATION STATE ---------- /
  const [internalErrors, setInternalErrors] = useState({});
  const [internalTouched, setInternalTouched] = useState({});

  const validationAdapter = useMemo(
    () => new ValidationAdapter("custom"),
    []
  );

  / ---------- AUTO FOCUS ---------- /
  useEffect(() => {
    if (readOnly) {
      cancelBtnRef.current?.focus();
    } else {
      firstInputRef.current?.focus();
    }
  }, [mode, readOnly]);

  / ---------- VALIDATE SINGLE FIELD ---------- /
  const validateSingleField = (field, value) => {
    const errorObj = validationAdapter.validate(
      { [field.name]: value },
      [field]
    );
    return errorObj[field.name];
  };

  / ---------- HANDLE FIELD CHANGE (Real-Time Validation) ---------- /
  const handleFieldChange = (field, value) => {
    // 1️⃣ Mark touched
    setInternalTouched(prev => ({
      ...prev,
      [field.name]: true
    }));

    // 2️⃣ Validate immediately using NEW value
    const error = validateSingleField(field, value);

    setInternalErrors(prev => ({
      ...prev,
      [field.name]: error
    }));

    // 3️⃣ Update parent state
    onChange(field.name, value);
  };

  / ---------- HANDLE FIELD BLUR ---------- /
  const handleFieldBlur = (field) => {
    setInternalTouched(prev => ({
      ...prev,
      [field.name]: true
    }));

    const value = values[field.name];
    const error = validateSingleField(field, value);

    setInternalErrors(prev => ({
      ...prev,
      [field.name]: error
    }));
  };

  / ---------- SAVE WITH FULL VALIDATION ---------- /
  const handleSave = useCallback(() => {
    const validationErrors = validationAdapter.validate(values, fields);

    // Mark all touched
    const touchedAll = {};
    fields.forEach(field => {
      touchedAll[field.name] = true;
    });

    setInternalTouched(touchedAll);
    setInternalErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return; // Block save
    }

    onSave(values);

  }, [values, fields, onSave, validationAdapter]);

  / ---------- KEYBOARD SHORTCUTS ---------- /
  useEffect(() => {
    const handler = (e) => {
      if (!e.altKey) return;

      const key = e.key.toLowerCase();

      if ((isAdd || isEdit) && (key === "s" || key === "u")) {
        e.preventDefault();
        handleSave();
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
  }, [mode, isAdd, isEdit, isDelete, onDelete, onCancel, handleSave]);

  / ---------- FIELD RENDER ---------- /
  const renderField = (field, index) => {
    const hasError =
      internalTouched[field.name] && internalErrors[field.name];

    return (
      <div
        key={field.name}
        style={{
          marginBottom: 20,
          position: "relative"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4
          }}
        >
          <label style={{ fontWeight: 600 }}>
            {field.label}
          </label>

          {field.guideline && (
            <span
              style={{
                fontSize: 11,
                color: "#666"
              }}
            >
              {field.guideline}
            </span>
          )}
        </div>

        <input
          ref={index === 0 ? firstInputRef : null}
          type={field.type || "text"}
          value={values[field.name] ?? ""}
          disabled={readOnly}
          maxLength={field.maxLength}
          min={field.min}
          max={field.max}
          onChange={(e) =>
            handleFieldChange(field, e.target.value)
          }
          onBlur={() => handleFieldBlur(field)}
          style={{
            width: "100%",
            padding: 6,
            boxSizing: "border-box",
            border: hasError ? "1px solid red" : "1px solid #ccc"
          }}
        />

        {hasError && (
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: -16,
              fontSize: 11,
              color: "red"
            }}
          >
            {internalErrors[field.name]}
          </div>
        )}
      </div>
    );
  };

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
          <button type="button" onClick={handleSave}>
            {isAdd ? "Save" : "Update"}
          </button>
        )}

        {isDelete && (
          <button type="button" onClick={onDelete}>
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
*/

// --- Milestone 7 Clean GenericForm (Field Renderer Only)

import React, {
  useEffect,
  useRef,
  useMemo,
  useState,
  forwardRef,
  useImperativeHandle
} from "react";
import ValidationAdapter from "./ValidationAdapter";

const GenericForm = forwardRef(function GenericForm(
  {
    mode,
    fields = [],
    values = {},
    onChange
  },
  ref
) {
  const isView = mode === "view";
  const isDelete = mode === "delete";

  const readOnly = isView || isDelete;

  const firstInputRef = useRef(null);
  const fieldRefs = useRef({}); // ✅ NEW

  /* ---------- INTERNAL VALIDATION STATE ---------- */
  const [internalErrors, setInternalErrors] = useState({});
  const [internalTouched, setInternalTouched] = useState({});

  const validationAdapter = useMemo(
    () => new ValidationAdapter("custom"),
    []
  );

  /* ---------- AUTO FOCUS ---------- */
  useEffect(() => {
    if (!readOnly) {
      firstInputRef.current?.focus();
    }
  }, [mode, readOnly]);

  /* ---------- NORMALIZE VALUE ---------- */
  const normalizeValue = (field, rawValue) => {
    if (field.type === "number") {
      if (rawValue === "" || rawValue === null) return "";
      return Number(rawValue);
    }

    if (typeof rawValue === "string") {
      return rawValue.trim();
    }

    return rawValue;
  };

  /* ---------- VALIDATE SINGLE FIELD ---------- */
  const validateSingleField = (field, value) => {
    const errorObj = validationAdapter.validate(
      { [field.name]: value },
      [field]
    );
    return errorObj[field.name];
  };

  /* ---------- ✅ VALIDATE ALL FIELDS (WITH FOCUS) ---------- */
  const validateAllFields = () => {
    let errors = {};
    let touched = {};
    let firstErrorField = null;

    fields.forEach((field) => {
      const value = normalizeValue(field, values[field.name]);
      const error = validateSingleField(field, value);

      if (error) {
        errors[field.name] = error;

        if (!firstErrorField) {
          firstErrorField = field.name; // capture first error
        }
      }

      touched[field.name] = true;
    });

    setInternalErrors(errors);
    setInternalTouched(touched);

    // ✅ FOCUS FIRST ERROR FIELD
    if (firstErrorField && fieldRefs.current[firstErrorField]) {
      fieldRefs.current[firstErrorField].focus();
    }

    return Object.keys(errors).length === 0;
  };

  /* ---------- EXPOSE TO PARENT ---------- */
  useImperativeHandle(ref, () => ({
    validateForm: validateAllFields
  }));

  /* ---------- HANDLE FIELD CHANGE ---------- */
  const handleFieldChange = (field, rawValue) => {
    const value = normalizeValue(field, rawValue);

    const error = validateSingleField(field, value);

    setInternalErrors((prev) => ({
      ...prev,
      [field.name]: error
    }));

    onChange(field.name, value);
  };

  /* ---------- HANDLE FIELD BLUR ---------- */
  const handleFieldBlur = (field, rawValueFromEvent) => {
    const value = normalizeValue(field, rawValueFromEvent);

    onChange(field.name, value);

    setInternalTouched((prev) => ({
      ...prev,
      [field.name]: true
    }));

    const error = validateSingleField(field, value);

    setInternalErrors((prev) => ({
      ...prev,
      [field.name]: error
    }));
  };

  /* ---------- FIELD TYPE RENDERER ---------- */
  const renderInputByType = (field, index) => {
    const commonProps = {
      ref: (el) => {
        if (el) fieldRefs.current[field.name] = el; // ✅ track all refs
        if (index === 0) firstInputRef.current = el;
      },
      value: values[field.name] ?? "",
      disabled: readOnly,
      onChange: (e) => handleFieldChange(field, e.target.value),
      onBlur: (e) => handleFieldBlur(field, e.target.value),
      style: {
        width: "100%",
        padding: 6,
        boxSizing: "border-box",
        border: "none",
        outline: "none"
      }
    };

    switch (field.type) {
      case "number":
        return <input type="number" {...commonProps} />;

      case "select":
        return (
          <select
            {...commonProps}
            onFocus={(e) => {
              e.target.size = field.options?.length || 2;
            }}
            onBlur={(e) => {
              e.target.size = 1;
              handleFieldBlur(field, e.target.value);
            }}
          >
            <option value="">Select</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );

      case "text":
      default:
        return (
          <input
            type="text"
            {...commonProps}
            maxLength={field.maxLength || undefined}
          />
        );
    }
  };

  /* ---------- FIELD RENDER ---------- */
  const renderField = (field, index) => {
    const hasError =
      internalTouched[field.name] && internalErrors[field.name];

    return (
      <div
        key={field.name}
        style={{
          marginBottom: 20,
          position: "relative"
        }}
      >
        {/* Label */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 4
          }}
        >
          <label style={{ fontWeight: 600 }}>
            {field.label}
            {field.required && (
              <span style={{ color: "red", marginLeft: 4 }}>*</span>
            )}
          </label>
        </div>

        {/* Input */}
        <div
          style={{
            border: hasError ? "1px solid red" : "1px solid #ccc"
          }}
        >
          {renderInputByType(field, index)}
        </div>

        {/* Error */}
        {hasError && (
          <div
            style={{
              position: "absolute",
              right: 0,
              bottom: -16,
              fontSize: 11,
              color: "red"
            }}
          >
            {internalErrors[field.name]}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ minWidth: 320 }}>
      {fields.map(renderField)}
    </div>
  );
});

export default GenericForm;