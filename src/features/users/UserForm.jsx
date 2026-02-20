/*
// --- Milestone 6

import React from "react";
import GenericForm from "../../core/form/GenericForm";

export default function UserForm(props) {
  / ---------- ENTITY NAME (Reusable Pattern) ---------- /
  const entityName = "User";

  const modeLabelMap = {
    add: "Add",
    edit: "Edit",
    view: "View",
    delete: "Delete"
  };

  const title = `${modeLabelMap[props.mode] || ""} ${entityName}`;

  / ---------- FIELD SCHEMA ---------- /
  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true,
      minLength: 2,
      maxLength: 30,
      guideline: "2–30 characters"
    },
    {
      label: "Age",
      name: "age",
      type: "number",
      required: true,
      min: 1,
      max: 120,
      guideline: "1–120"
    },
    {
      label: "City",
      name: "city",
      type: "text",
      required: true,
      maxLength: 40,
      guideline: "Max 40 characters"
    }
  ];

  return (
    <GenericForm
      {...props}
      title={title}
      fields={fields}
    />
  );
}
  
*/

// --- Milestone 6

import React from "react";
import GenericForm from "../../core/form/GenericForm";

export default function UserForm(props) {
  /* ---------- ENTITY NAME (Reusable Pattern) ---------- */
  const entityName = "User";

  const modeLabelMap = {
    add: "Add",
    edit: "Edit",
    view: "View",
    delete: "Delete"
  };

  const title = `${modeLabelMap[props.mode] || ""} ${entityName}`;

  /* ---------- FIELD SCHEMA ---------- */
  const fields = [
    {
      label: "Name",
      name: "name",
      type: "text",
      required: true,
      minLength: 2,
      maxLength: 30,
      guideline: "2–30 characters"
    },
    {
      label: "Age",
      name: "age",
      type: "number",
      required: true,
      min: 1,
      max: 120,
      guideline: "1–120"
    },
    {
      label: "City",
      name: "city",
      type: "text",
      required: true,
      maxLength: 40,
      guideline: "Max 40 characters"
    }
  ];

  return (
    <GenericForm
      {...props}
      title={title}
      fields={fields}
    />
  );
}
