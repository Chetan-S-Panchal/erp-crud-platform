// --- Milestone 4

import { useEffect } from "react";

/**
 * Generic keyboard shortcut handler
 * Enterprise-safe Function Key mapping
 */
export default function useKeyboardShortcuts({
  enabled,
  selectedRow,
  onAdd,
  onEdit,
  onView,
  onDelete
}) {
  useEffect(() => {
    if (!enabled) return;

    function handleKeyDown(e) {
      // 🚫 Do not trigger shortcuts while typing in inputs
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        return;
      }

      switch (e.key) {

        // F9 → Add
        case "F9":
          e.preventDefault();
          onAdd && onAdd();
          break;

        // F2 → Edit
        case "F2":
          if (!selectedRow) return;
          e.preventDefault();
          onEdit && onEdit(selectedRow);
          break;

        // F4 → View
        case "F4":
          if (!selectedRow) return;
          e.preventDefault();
          onView && onView(selectedRow);
          break;

        // F8 → Delete
        case "F8":
          if (!selectedRow) return;
          e.preventDefault();
          onDelete && onDelete(selectedRow);
          break;

        default:
          break;
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    enabled,
    selectedRow,
    onAdd,
    onEdit,
    onView,
    onDelete
  ]);
}
