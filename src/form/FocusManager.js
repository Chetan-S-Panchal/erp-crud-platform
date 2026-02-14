
// --- Milestone 4

export default function createFocusManager() {
  const fields = new Map();
  let lastFocusedFieldId = null;

  function registerField(fieldId, ref, sequence) {
    fields.set(fieldId, {
      id: fieldId,
      ref,
      sequence
    });
  }

  function unregisterField(fieldId) {
    fields.delete(fieldId);
  }

  function focusField(fieldId) {
    const field = fields.get(fieldId);
    if (!field || !field.ref?.current) return;

    lastFocusedFieldId = fieldId;

    field.ref.current.focus();
    field.ref.current.scrollIntoView({
      block: "nearest",
      behavior: "auto"
    });
  }

  function getActiveFieldId() {
    for (const [fieldId, { ref }] of fields) {
      if (ref.current === document.activeElement) {
        return fieldId;
      }
    }
    return lastFocusedFieldId;
  }

  function destroy() {
    fields.clear();
  }

  // ✅ PUBLIC API (important)
  return {
    registerField,
    unregisterField,
    focusField,
    getActiveFieldId,
    destroy
  };
}
