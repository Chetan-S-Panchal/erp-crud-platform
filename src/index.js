// --- Milestone 4

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";

import "./index.css";

ModuleRegistry.registerModules([
  ClientSideRowModelModule
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
