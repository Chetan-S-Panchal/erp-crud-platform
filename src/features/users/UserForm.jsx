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
// --- Milestone 7 Clean UserForm

import React from "react";
import GenericForm from "../../core/form/GenericForm";
import BaseModal from "../../core/ui/BaseModal";

export default function UserForm(props) {
  const entityName = "User";

  const modeLabelMap = {
    add: "Add",
    edit: "Edit",
    view: "View",
    delete: "Delete"
  };

  const title = `${modeLabelMap[props.mode] || ""} ${entityName}`;

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
    <BaseModal
      isOpen={props.isOpen}
      title={title}
      mode={props.mode}
      onSave={() => props.onSave(props.values)}
      onCancel={props.onCancel}
      onDelete={props.onDelete}
      isValid={true} // temporary — we will centralize validation later
    >
      <>
        <GenericForm
          mode={props.mode}
          fields={fields}
          values={props.values}
          onChange={props.onChange}
        />
        
      </>
    </BaseModal>
  );
}