// --- Milestone 4

import React, { forwardRef } from "react";

const InputField = forwardRef(function InputField(
  {
    label,
    type = "text",
    value,
    disabled = false,
    error,
    touched,
    onChange,
    onBlur,
    onKeyDown
  },
  ref
) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 12
      }}
    >
      {label && (
        <label
          style={{
            marginBottom: 4,
            fontWeight: 500
          }}
        >
          {label}
        </label>
      )}

      <input
        ref={ref}
        type={type}
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        style={{
          padding: "6px 8px",
          border: "1px solid #999",
          borderRadius: 4,
          outline: "none"
        }}
      />

      {touched && error && (
        <span
          style={{
            color: "red",
            fontSize: 12,
            marginTop: 4
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
});

export default InputField;
