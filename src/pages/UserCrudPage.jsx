// --- Milestone 4

import React, { useState, useRef, useMemo, useEffect } from "react";

import GenericGrid from "../components/crud/GenericGrid";
import UserForm from "../components/UserForm";
import useGridFocusManager from "../grid/useGridFocusManager";

export default function UserCrudPage() {
  /* ---------------- STATE ---------------- */

  const [data, setData] = useState([
    { id: 1, name: "John", age: 25, city: "New York" },
    { id: 2, name: "Mary", age: 30, city: "London" }
  ]);

  const [mode, setMode] = useState(null); // add | edit | view | delete | null
  const [selectedRow, setSelectedRow] = useState(null);

  const gridRef = useRef(null);

  /* ---------------- ESC KEY HANDLER (Modal Only) ---------------- */

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && mode) {
        handleCancel();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [mode]);

  /* ---------------- MEMOIZED DATA ---------------- */

  const stableRowData = useMemo(() => data, [data]);

  const columnsMeta = useMemo(
    () => [
      { header: "Name", field: "name" },
      { header: "Age", field: "age" },
      { header: "City", field: "city" }
    ],
    []
  );

  /* ---------------- GRID ACTIONS ---------------- */

  const handleAdd = () => {
    setSelectedRow({ name: "", age: "", city: "" });
    setMode("add");
  };

  const handleView = (row) => {
    if (!row) return;
    setSelectedRow(row);
    setMode("view");
  };

  const handleEdit = (row) => {
    if (!row) return;
    setSelectedRow(row);
    setMode("edit");
  };

  const handleDelete = (row) => {
    if (!row) return;
    setSelectedRow(row);
    setMode("delete");
  };

  /* ---------------- FORM ACTIONS ---------------- */

  const handleChange = (field, value) => {
    setSelectedRow((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (values) => {
    const sanitizedValues = {
      ...values,
      age: values.age ? Number(values.age) : null
    };

    if (mode === "add") {
      const newEntry = {
        ...sanitizedValues,
        id: Date.now()
      };
      setData((prev) => [...prev, newEntry]);
    }

    if (mode === "edit") {
      setData((prev) =>
        prev.map((item) =>
          item.id === selectedRow.id
            ? { ...sanitizedValues, id: item.id }
            : item
        )
      );
    }

    handleCancel();
  };

  const handleConfirmDelete = () => {
    setData((prev) =>
      prev.filter((item) => item.id !== selectedRow.id)
    );

    handleCancel();
  };

  const handleCancel = () => {
    setMode(null);
    setSelectedRow(null);
  };

  /* ---------------- GRID KEYBOARD MANAGER ---------------- */

  useGridFocusManager({
    gridRef,
    onAdd: handleAdd,
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
    enabled: mode === null // 🔥 strictly enable only when grid visible
  });

  /* ---------------- RENDER ---------------- */

  return (
    <div style={{ padding: 20 }}>
      <h2>User Management</h2>

      {/* Parent Action Buttons */}
      {!mode && (
        <div style={{ marginBottom: 10 }}>
          <button
            onClick={handleAdd}
            style={{ marginRight: 10 }}
          >
            Add (F2)
          </button>
        </div>
      )}

      {/* Grid always mounted */}
      <GenericGrid
        gridRef={gridRef}
        columnsMeta={columnsMeta}
        rowData={stableRowData}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Modal Overlay */}
      {mode && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              width: 500,
              maxWidth: "90%",
              boxShadow: "0 5px 15px rgba(0,0,0,0.3)"
            }}
          >
            <UserForm
              mode={mode}
              values={selectedRow}
              errors={{}}
              touched={{}}
              onChange={handleChange}
              onSave={handleSave}
              onDelete={handleConfirmDelete}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
}
