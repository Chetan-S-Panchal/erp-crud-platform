/*
// --- Milestone 4

import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function GenericGrid({
  gridRef,
  columnsMeta,
  rowData,
  onView,
  onEdit,
  onDelete
}) {
  const columnDefs = useMemo(() => {
    return [
      ...columnsMeta.map((c) => ({
        headerName: c.header,
        field: c.field,
        sortable: true,
        filter: true
      })),
      {
        headerName: "Actions",
        width: 240,
        cellRenderer: (params) => {
          const row = params.data;

          return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                  height: "100%"
                }}
              >

              <button onClick={() => onView(row)}>
                View (F4)
              </button>

              <button onClick={() => onEdit(row)}>
                Edit (F7)
              </button>

              <button onClick={() => onDelete(row)}>
                Delete (F8)
              </button>
            </div>
          );
        }
      }
    ];
  }, [columnsMeta, onView, onEdit, onDelete]);

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 300, width: "100%", marginTop: 10 }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection="single"
      />
    </div>
  );
}
*/

/*
// --- Milestone 5 (Focus + Selection Sync Enabled)

import React, { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

export default function GenericGrid({
  gridRef,
  columnsMeta = [],
  rowData = [],
  onView,
  onEdit,
  onDelete,
  onRowSelected
}) {
  / ---------------- COLUMN DEFINITIONS ---------------- /

  const columnDefs = useMemo(() => {
    return [
      ...columnsMeta.map((c) => ({
        headerName: c.header,
        field: c.field,
        sortable: true,
        filter: true,
        flex: 1
      })),
      {
        headerName: "Actions",
        width: 240,
        sortable: false,
        filter: false,
        cellRenderer: (params) => {
          const row = params.data;

          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                height: "100%"
              }}
            >
              <button onClick={() => onView && onView(row)}>
                View (F4)
              </button>

              <button onClick={() => onEdit && onEdit(row)}>
                Edit (F7)
              </button>

              <button onClick={() => onDelete && onDelete(row)}>
                Delete (F8)
              </button>
            </div>
          );
        }
      }
    ];
  }, [columnsMeta, onView, onEdit, onDelete]);

  / ---------------- SELECTION HANDLER ---------------- /

  const handleSelectionChanged = (event) => {
    const selectedNode = event.api.getSelectedNodes()[0];
    if (onRowSelected && selectedNode) {
      onRowSelected(selectedNode.data, selectedNode.rowIndex);
    }
  };

  / ---------------- FOCUS → SELECTION SYNC ---------------- /

  const handleCellFocused = (event) => {
    if (!event.api) return;
    if (event.rowIndex == null) return;

    const node = event.api.getDisplayedRowAtIndex(event.rowIndex);

    if (node && !node.isSelected()) {
      node.setSelected(true);
    }
  };

  return (
    <div
      className="ag-theme-alpine"
      style={{ height: 300, width: "100%", marginTop: 10 }}
    >
      <AgGridReact
        ref={gridRef}
        rowData={rowData}
        columnDefs={columnDefs}
        rowSelection="single"
        suppressRowClickSelection={false}
        onSelectionChanged={handleSelectionChanged}
        onCellFocused={handleCellFocused}   // 🔥 KEY FIX
      />
    </div>
  );
}
*/
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
