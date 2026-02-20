// --- Milestone 6


// ---------- VALIDATION RULES ---------- /

export const validationRules = {
  name: {
    required: true,
    minLength: 2
  },
  age: {
    required: true,
    min: 1
  },
  city: {
    required: true,
    minLength: 3
  }
};

// ---------- VALIDATE SINGLE FIELD ---------- 

export function validateField(field, value, rules) {
  const rule = rules[field];
  if (!rule) return "";

  if (rule.required && !value.trim()) {
    return "This field is required";
  }

  if (rule.minLength && value.length < rule.minLength) {
    return `Minimum ${rule.minLength} characters required`;
  }

  if (rule.min && Number(value) < rule.min) {
    return `Value must be greater than ${rule.min - 1}`;
  }

  return "";
}

// ---------- VALIDATE FULL FORM ---------- 

export function validateForm(form, rules) {
  const errors = {};
  let valid = true;

  Object.keys(rules).forEach(field => {
    const error = validateField(field, form[field] || "", rules);
    if (error) {
      valid = false;
      errors[field] = error;
    }
  });

  return { valid, errors };
}
