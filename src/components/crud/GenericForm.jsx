// --- Milestone 4

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
