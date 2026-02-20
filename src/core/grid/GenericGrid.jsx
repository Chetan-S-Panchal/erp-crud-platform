/*
// --- Milestone 6

import React, { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function GenericGrid({
  gridRef,
  onGridReady,
  columnsMeta,
  rowData,
  onRowSelected,
  onView,
  onEdit,
  onDelete
}) {
  / ---------------- COLUMN DEFINITIONS ---------------- /

  const columnDefs = useMemo(() => {
    const baseColumns = columnsMeta.map((col) => ({
      headerName: col.header,
      field: col.field,
      sortable: true,
      filter: true,
      resizable: true
    }));

    // ✅ Action column restored
  baseColumns.push({
    headerName: "Actions",
    field: "actions",
    width: 300,
    sortable: false,
    filter: false,
    cellRenderer: (params) => (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 8
        }}
      >
        <button onClick={() => onView?.(params.data)}>
          View (F4)
        </button>

        <button onClick={() => onEdit?.(params.data)}>
          Edit (F7)
        </button>

        <button onClick={() => onDelete?.(params.data)}>
          Delete (F8)
        </button>
      </div>
    )
  });

    return baseColumns;
  }, [columnsMeta, onView, onEdit, onDelete]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true
    }),
    []
  );

  / ---------------- SELECTION HANDLING ---------------- /

  const handleSelectionChanged = useCallback(
    (params) => {
      const selectedNode = params.api.getSelectedNodes()[0];
      if (selectedNode && onRowSelected) {
        onRowSelected(selectedNode.data);
      }
    },
    [onRowSelected]
  );

  / ---------------- KEYBOARD FOCUS SYNC ---------------- /

  const handleCellFocused = useCallback(
    (params) => {
      if (params.rowIndex != null) {
        const node = params.api.getDisplayedRowAtIndex(params.rowIndex);
        node?.setSelected(true);
      }
    },
    []
  );

  / ---------------- RENDER ---------------- /

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 400, width: "100%" }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="single"
        suppressRowClickSelection={false}
        onGridReady={onGridReady}
        onSelectionChanged={handleSelectionChanged}
        onCellFocused={handleCellFocused}   
      />
    </div>
  );
}
*/

// --- After Milestone 6

import React, { useMemo, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function GenericGrid({
  gridRef,
  onGridReady,
  columnsMeta,
  rowData,
  onRowSelected,
  onView,
  onEdit,
  onDelete
}) {
  /* ---------------- COLUMN DEFINITIONS ---------------- */

  const columnDefs = useMemo(() => {
    const baseColumns = columnsMeta.map((col) => ({
      headerName: col.header,
      field: col.field,
      sortable: true,
      filter: true,
      resizable: true
    }));

    // ✅ Action column restored
  baseColumns.push({
    headerName: "Actions",
    field: "actions",
    width: 300,
    sortable: false,
    filter: false,
    cellRenderer: (params) => (
      <div
        style={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 8
        }}
      >
        <button onClick={() => onView?.(params.data)}>
          View (F4)
        </button>

        <button onClick={() => onEdit?.(params.data)}>
          Edit (F7)
        </button>

        <button onClick={() => onDelete?.(params.data)}>
          Delete (F8)
        </button>
      </div>
    )
  });

    return baseColumns;
  }, [columnsMeta, onView, onEdit, onDelete]);

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
      resizable: true
    }),
    []
  );

  /* ---------------- SELECTION HANDLING ---------------- */

  const handleSelectionChanged = useCallback(
    (params) => {
      const selectedNode = params.api.getSelectedNodes()[0];
      if (selectedNode && onRowSelected) {
        onRowSelected(selectedNode.data);
      }
    },
    [onRowSelected]
  );

  /* ---------------- KEYBOARD FOCUS SYNC ---------------- */

  const handleCellFocused = useCallback(
    (params) => {
      if (params.rowIndex != null) {
        const node = params.api.getDisplayedRowAtIndex(params.rowIndex);
        node?.setSelected(true);
      }
    },
    []
  );

  /* ---------------- RENDER ---------------- */

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 400, width: "100%" }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        rowSelection="single"
        suppressRowClickSelection={false}
        onGridReady={onGridReady}
        onSelectionChanged={handleSelectionChanged}
        onCellFocused={handleCellFocused}   
      />
    </div>
  );
}
