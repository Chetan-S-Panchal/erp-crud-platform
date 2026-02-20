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
