/*
// --- Milestone 6

import React, { useState, useRef, useMemo, useEffect } from "react";

import GenericGrid from "../../core/grid/GenericGrid";
import useGridFocusManager from "../../core/grid/useGridFocusManager";
import UserForm from "./UserForm";


export default function UserCrudPage() {
  / ---------------- STATE ---------------- /

  const [data, setData] = useState([
    { id: 1, name: "John", age: 25, city: "New York" },
    { id: 2, name: "Mary", age: 30, city: "London" }
  ]);

  const [mode, setMode] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

  const gridRef = useRef(null);

  / ---------------- FOCUS UTILITY ---------------- /

  const focusRow = (rowIndex) => {
    const api = gridRef.current?.api;
    if (!api) return;

    const rowCount = api.getDisplayedRowCount();
    if (rowCount === 0) return;

    if (rowIndex < 0) rowIndex = 0;
    if (rowIndex >= rowCount) rowIndex = rowCount - 1;

    const firstCol = api.getAllDisplayedColumns()[0]?.getColId();

    api.setFocusedCell(rowIndex, firstCol);
    api.getDisplayedRowAtIndex(rowIndex)?.setSelected(true);
    api.ensureIndexVisible(rowIndex);

    setLastSelectedIndex(rowIndex);
  };

  / ---------------- GRID READY ---------------- /

  const handleGridReady = (params) => {
    gridRef.current = params;

    const rowCount = params.api.getDisplayedRowCount();
    if (rowCount > 0) {
      setTimeout(() => focusRow(0), 0);
    }
  };

  / ---------------- ESC HANDLER ---------------- /
  const handleCancel = React.useCallback(() => {
    const params = gridRef.current;
    const api = params?.api;

    setMode(null);
    setSelectedRow(null);

    if (api && lastSelectedIndex != null) {
      setTimeout(() => {
        const firstCol = api.getAllDisplayedColumns()[0]?.getColId();

        api.ensureIndexVisible(lastSelectedIndex);
        api.setFocusedCell(lastSelectedIndex, firstCol);
        api.getDisplayedRowAtIndex(lastSelectedIndex)?.setSelected(true);

        // ✅ Proper way to restore keyboard control
        const gridElement = document.querySelector(".ag-root-wrapper");
        gridElement?.focus();
      }, 0);
    }
  }, [lastSelectedIndex]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && mode) {
        handleCancel();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [mode, handleCancel]);   

  / ---------------- MEMO DATA ---------------- /

  const stableRowData = useMemo(() => data, [data]);

  const columnsMeta = useMemo(
    () => [
      { header: "Name", field: "name" },
      { header: "Age", field: "age" },
      { header: "City", field: "city" }
    ],
    []
  );

  / ---------------- GRID ACTIONS ---------------- /

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

  / ---------------- FORM ACTIONS ---------------- /

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
      const newEntry = { ...sanitizedValues, id: Date.now() };

      setData((prev) => {
        const updated = [...prev, newEntry];
        setTimeout(() => focusRow(updated.length - 1), 0);
        return updated;
      });
    }

    if (mode === "edit") {
      setData((prev) =>
        prev.map((item) =>
          item.id === selectedRow.id
            ? { ...sanitizedValues, id: item.id }
            : item
        )
      );

      setTimeout(() => focusRow(lastSelectedIndex), 0);
    }

    handleCancel();
  };

  const handleConfirmDelete = () => {
    const deletedIndex = lastSelectedIndex;

    setData((prev) => {
      const updated = prev.filter(
        (item) => item.id !== selectedRow.id
      );
      setTimeout(() => focusRow(deletedIndex), 0);
      return updated;
    });

    handleCancel();
  };

  
  / ---------------- ROW SELECTION ---------------- /

  const handleRowSelected = (row) => {
    const api = gridRef.current?.api;
    const selectedNode = api?.getSelectedNodes()[0];

    if (selectedNode) {
      setLastSelectedIndex(selectedNode.rowIndex);
      setSelectedRow(row);
    }
  };

  / ---------------- KEYBOARD MANAGER ---------------- /

  useGridFocusManager({
    gridRef,
    onAdd: handleAdd,
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
    enabled: mode === null
  });

  / ---------------- RENDER ---------------- /

  return (
    <div style={{ padding: 20 }}>
      <h2>User Management</h2>

      {!mode && (
        <div style={{ marginBottom: 10 }}>
          <button onClick={handleAdd}>Add (F2)</button>
        </div>
      )}

      <GenericGrid
        gridRef={gridRef}
        onGridReady={handleGridReady}
        columnsMeta={columnsMeta}
        rowData={stableRowData}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRowSelected={handleRowSelected}
      />

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
*/


// --- After Milestone 6

import React, { useState, useRef, useMemo, useEffect } from "react";

import GenericGrid from "../../core/grid/GenericGrid";
import useGridFocusManager from "../../core/grid/useGridFocusManager";
import UserForm from "./UserForm";


export default function UserCrudPage() {
  /* ---------------- STATE ---------------- */

  const [data, setData] = useState([
    { id: 1, name: "John", age: 25, city: "New York" },
    { id: 2, name: "Mary", age: 30, city: "London" }
  ]);

  const [mode, setMode] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [lastSelectedIndex, setLastSelectedIndex] = useState(null);

  const gridRef = useRef(null);

  /* ---------------- FOCUS UTILITY ---------------- */

  const focusRow = (rowIndex) => {
    const api = gridRef.current?.api;
    if (!api) return;

    const rowCount = api.getDisplayedRowCount();
    if (rowCount === 0) return;

    if (rowIndex < 0) rowIndex = 0;
    if (rowIndex >= rowCount) rowIndex = rowCount - 1;

    const firstCol = api.getAllDisplayedColumns()[0]?.getColId();

    api.setFocusedCell(rowIndex, firstCol);
    api.getDisplayedRowAtIndex(rowIndex)?.setSelected(true);
    api.ensureIndexVisible(rowIndex);

    setLastSelectedIndex(rowIndex);
  };

  /* ---------------- GRID READY ---------------- */

  const handleGridReady = (params) => {
    gridRef.current = params;

    const rowCount = params.api.getDisplayedRowCount();
    if (rowCount > 0) {
      setTimeout(() => focusRow(0), 0);
    }
  };

  /* ---------------- ESC HANDLER ---------------- */
  const handleCancel = React.useCallback(() => {
    const params = gridRef.current;
    const api = params?.api;

    setMode(null);
    setSelectedRow(null);

    if (api && lastSelectedIndex != null) {
      setTimeout(() => {
        const firstCol = api.getAllDisplayedColumns()[0]?.getColId();

        api.ensureIndexVisible(lastSelectedIndex);
        api.setFocusedCell(lastSelectedIndex, firstCol);
        api.getDisplayedRowAtIndex(lastSelectedIndex)?.setSelected(true);

        // ✅ Proper way to restore keyboard control
        const gridElement = document.querySelector(".ag-root-wrapper");
        gridElement?.focus();
      }, 0);
    }
  }, [lastSelectedIndex]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && mode) {
        handleCancel();
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [mode, handleCancel]);   

  /* ---------------- MEMO DATA ---------------- */

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
      const newEntry = { ...sanitizedValues, id: Date.now() };

      setData((prev) => {
        const updated = [...prev, newEntry];
        setTimeout(() => focusRow(updated.length - 1), 0);
        return updated;
      });
    }

    if (mode === "edit") {
      setData((prev) =>
        prev.map((item) =>
          item.id === selectedRow.id
            ? { ...sanitizedValues, id: item.id }
            : item
        )
      );

      setTimeout(() => focusRow(lastSelectedIndex), 0);
    }

    handleCancel();
  };

  const handleConfirmDelete = () => {
    const deletedIndex = lastSelectedIndex;

    setData((prev) => {
      const updated = prev.filter(
        (item) => item.id !== selectedRow.id
      );
      setTimeout(() => focusRow(deletedIndex), 0);
      return updated;
    });

    handleCancel();
  };

  
  /* ---------------- ROW SELECTION ---------------- */

  const handleRowSelected = (row) => {
    const api = gridRef.current?.api;
    const selectedNode = api?.getSelectedNodes()[0];

    if (selectedNode) {
      setLastSelectedIndex(selectedNode.rowIndex);
      setSelectedRow(row);
    }
  };

  /* ---------------- KEYBOARD MANAGER ---------------- */

  useGridFocusManager({
    gridRef,
    onAdd: handleAdd,
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
    enabled: mode === null
  });

  /* ---------------- RENDER ---------------- */

  return (
    <div style={{ padding: 20 }}>
      <h2>User Management</h2>

      {!mode && (
        <div style={{ marginBottom: 10 }}>
          <button onClick={handleAdd}>Add (F2)</button>
        </div>
      )}

      <GenericGrid
        gridRef={gridRef}
        onGridReady={handleGridReady}
        columnsMeta={columnsMeta}
        rowData={stableRowData}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRowSelected={handleRowSelected}
      />

<UserForm
  isOpen={!!mode}
  mode={mode}
  values={selectedRow}
  onChange={handleChange}
  onSave={handleSave}
  onDelete={handleConfirmDelete}
  onCancel={handleCancel}
/>      
    </div>
  );
}
