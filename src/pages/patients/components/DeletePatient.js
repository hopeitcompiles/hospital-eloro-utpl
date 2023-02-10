import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { deletePatient } from "../../../service/PatientService";
import Style from "../css/AddForm.module.css";

export default function DeletePatient({ deleting, onCancel, onDelete }) {
  const [error, setError] = useState("");
  const handleDelete = async () => {
    const response = await deletePatient(deleting?.id);
    if (response) {
      setError("Done");
      if (onDelete) {
        onDelete();
      }
    } else {
      setError("Failed");
    }
  };

  return (
    <div>
      <p>Are you sure to delete this patient?</p>
      <h5>
        {deleting?.name} {deleting?.lastName}
      </h5>
      {error}
      <ButtonGroup className={Style.buttongroup}>
        <Button
          className={Style.button}
          size="20"
          variant="secondary"
          onClick={() => {
            if (onCancel) {
              onCancel();
            }
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            handleDelete();
            if (onDelete) {
              onDelete();
            }
          }}
          variant="danger"
        >
          Delete
        </Button>
      </ButtonGroup>
    </div>
  );
}
