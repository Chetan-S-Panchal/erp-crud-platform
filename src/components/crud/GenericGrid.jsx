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
