// src/form/validationAdapter.js

// -----------------------------
// Utility: run single rule
// -----------------------------

// --- Milestone 4

function runRule(rule, value, values) {
  // rule can be:
  // - function
  // - object describing generic rule

  // Custom function rule
  if (typeof rule === "function") {
    return rule(value, values);
  }

  // Generic object rules
  if (!rule || !rule.type) return null;

  switch (rule.type) {
    case "required":
      if (value === null || value === undefined || value === "") {
        return rule.message || "Required";
      }
      return null;

    case "minLength":
      if (value && value.length < rule.value) {
        return (
          rule.message ||
          `Minimum length is ${rule.value}`
        );
      }
      return null;

    case "maxLength":
      if (value && value.length > rule.value) {
        return (
          rule.message ||
          `Maximum length is ${rule.value}`
        );
      }
      return null;

    case "min":
      if (value !== null && value < rule.value) {
        return (
          rule.message ||
          `Minimum value is ${rule.value}`
        );
      }
      return null;

    case "max":
      if (value !== null && value > rule.value) {
        return (
          rule.message ||
          `Maximum value is ${rule.value}`
        );
      }
      return null;

    default:
      return null;
  }
}

// -----------------------------
// Validate one field
// -----------------------------
export function validateField(fieldSchema, value, values) {
  if (!fieldSchema?.validation) {
    return null;
  }

  for (const rule of fieldSchema.validation) {
    const error = runRule(rule, value, values);
    if (error) return error;
  }

  return null;
}

// -----------------------------
// Validate entire form
// -----------------------------
export function validateForm(schema, values) {
  const errors = {};
  let firstErrorField = null;

  const orderedFields = [...schema.fields].sort(
    (a, b) => a.sequence - b.sequence
  );

  for (const field of orderedFields) {
    const value = values[field.id];

    const error = validateField(field, value, values);

    if (error) {
      errors[field.id] = error;

      if (!firstErrorField) {
        firstErrorField = field.id;
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    firstErrorField
  };
}
