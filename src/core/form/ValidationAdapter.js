/*
// Milestone 6
// src/core/form/ValidationAdapter.js

class ValidationAdapter {
  constructor(engine = "custom") {
    this.engine = engine;
  }

  validate(values, schema, featureValidators = []) {
    switch (this.engine) {
      case "custom":
      default:
        return this.runCustomValidation(values, schema, featureValidators);
    }
  }

runCustomValidation(values, schema, featureValidators) {
  const errors = {};

  schema.forEach((field) => {
    const value = values[field.name];

    // Required
    if (
      field.required &&
      (value === undefined || value === null || value === "")
    ) {
      errors[field.name] = `${field.label} is required`;
      return;
    }

    // Min Length (only for string)
    if (
      field.minLength &&
      typeof value === "string" &&
      value.length < field.minLength
    ) {
      errors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
      return;
    }

    // Max Length
    if (
      field.maxLength &&
      typeof value === "string" &&
      value.length > field.maxLength
    ) {
      errors[field.name] = `${field.label} must not exceed ${field.maxLength} characters`;
      return;
    }

    // Number validations
    if (field.type === "number" && value !== "") {
      const numericValue = Number(value);

      if (field.min !== undefined && numericValue < field.min) {
        errors[field.name] = `${field.label} must be at least ${field.min}`;
        return;
      }

      if (field.max !== undefined && numericValue > field.max) {
        errors[field.name] = `${field.label} must not exceed ${field.max}`;
        return;
      }
    }
  });

  featureValidators.forEach((validator) => {
    const result = validator(values);
    if (result) {
      Object.assign(errors, result);
    }
  });

  return errors;
}
}

export default ValidationAdapter;

*/

// After Milestone 6

class ValidationAdapter {
  constructor(engine = "custom") {
    this.engine = engine;
  }

  validate(values, schema, featureValidators = []) {
    switch (this.engine) {
      case "custom":
      default:
        return this.runCustomValidation(values, schema, featureValidators);
    }
  }

  runCustomValidation(values, schema, featureValidators) {
    const errors = {};

    schema.forEach((field) => {
      let value = values[field.name];

      /* ---------- NORMALIZATION ---------- */
      if (typeof value === "string") {
        value = value.trim(); // 🔥 Fix: handles " "
      }

      /* ---------- REQUIRED ---------- */
      if (field.required) {
        const isEmpty =
          value === undefined ||
          value === null ||
          value === "";

        if (isEmpty) {
          errors[field.name] = `${field.label} is required`;
          return;
        }
      }

      /* ---------- TEXT VALIDATION ---------- */
      if (field.type === "text") {
        if (typeof value === "string") {
          if (field.minLength && value.length < field.minLength) {
            errors[field.name] = `${field.label} must be at least ${field.minLength} characters`;
            return;
          }

          if (field.maxLength && value.length > field.maxLength) {
            errors[field.name] = `${field.label} must not exceed ${field.maxLength} characters`;
            return;
          }
        }
      }

      /* ---------- NUMBER VALIDATION ---------- */
      if (field.type === "number") {
        if (value !== "") {
          const numericValue = Number(value);

          // 🔥 Fix: reject 0 explicitly
          if (numericValue === 0) {
            errors[field.name] = `${field.label} must be greater than 0`;
            return;
          }

          if (isNaN(numericValue)) {
            errors[field.name] = `${field.label} must be a valid number`;
            return;
          }

          if (field.min !== undefined && numericValue < field.min) {
            errors[field.name] = `${field.label} must be at least ${field.min}`;
            return;
          }

          if (field.max !== undefined && numericValue > field.max) {
            errors[field.name] = `${field.label} must not exceed ${field.max}`;
            return;
          }
        }
      }

      /* ---------- SELECT VALIDATION ---------- */
      if (field.type === "select") {
        if (
          field.required &&
          (value === "" || value === null || value === undefined)
        ) {
          errors[field.name] = `Please select ${field.label}`;
          return;
        }
      }
    });

    /* ---------- FEATURE LEVEL VALIDATORS ---------- */
    featureValidators.forEach((validator) => {
      const result = validator(values);
      if (result) {
        Object.assign(errors, result);
      }
    });

    return errors;
  }
}

export default ValidationAdapter;