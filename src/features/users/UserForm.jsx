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

import React, { useRef } from "react";
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

  const formRef = useRef(); // ✅ NEW

  const fields = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
      minLength: 3,
      maxLength: 50,
      guideline: "Min 3, Max 50 characters"
    },
    {
      name: "age",
      label: "Age",
      type: "number",
      min: 1,
      required: true,
      guideline: "Enter Valid Age"
    },
    {
      name: "city",
      label: "City",
      type: "select",
      options: ["Mumbai", "Delhi"],
      required: true,
      guideline: "Select city"
    }
  ];

  /* ---------- ✅ HANDLE SAVE WITH VALIDATION ---------- */
  const handleSave = () => {
    const isValid = formRef.current.validateForm();

    if (!isValid) {
      console.log("Form has errors");
      return;
    }

    props.onSave(props.values);
  };

  return (
    <BaseModal
      isOpen={props.isOpen}
      title={title}
      mode={props.mode}
      onSave={handleSave} // ✅ UPDATED
      onCancel={props.onCancel}
      onDelete={props.onDelete}
      isValid={true}
    >
      <>
        <GenericForm
          ref={formRef} // ✅ IMPORTANT
          mode={props.mode}
          fields={fields}
          values={props.values}
          onChange={props.onChange}
        />
      </>
    </BaseModal>
  );
}