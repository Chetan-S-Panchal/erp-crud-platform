// --- Milestone 4
import { useEffect } from "react";

export default function useGridFocusManager({
  gridRef,
  onAdd,
  onView,
  onEdit,
  onDelete,
  enabled = true
}) {
  useEffect(() => {
    const handler = (e) => {
      if (!enabled) return;

      // 🚫 Ignore if user is typing in input controls
      const activeEl = document.activeElement;
      const activeTag = activeEl?.tagName;

      if (
        activeTag === "INPUT" ||
        activeTag === "TEXTAREA" ||
        activeTag === "SELECT" ||
        activeEl?.isContentEditable
      ) {
        return;
      }

      if (!gridRef?.current?.api) return;

      const api = gridRef.current.api;

      // 🚫 Only act if grid has focused cell or selected row
      const focusedCell = api.getFocusedCell();
      const selectedRows = api.getSelectedRows();
      const selected = selectedRows?.[0];

      // 🔹 F2 → Add (always allowed)
      if (e.key === "F2") {
        e.preventDefault();
        onAdd?.();
        return;
      }

      // From here onward → require selected row
      if (!selected) return;

      // 🔹 F4 → View
      if (e.key === "F4") {
        e.preventDefault();
        onView?.(selected);
        return;
      }

      // 🔹 F7 → Edit
      if (e.key === "F7") {
        e.preventDefault();
        onEdit?.(selected);
        return;
      }

      // 🔹 F8 → Delete
      if (e.key === "F8") {
        e.preventDefault();
        onDelete?.(selected);
        return;
      }

      // 🔹 Enter → View (only if grid cell focused)
      if (e.key === "Enter" && focusedCell) {
        e.preventDefault();
        onView?.(selected);
        return;
      }

      // 🔹 Escape → remove grid focus only
      if (e.key === "Escape") {
        api.clearFocusedCell();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [gridRef, onAdd, onView, onEdit, onDelete, enabled]);
}
