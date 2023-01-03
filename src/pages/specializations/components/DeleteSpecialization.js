import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { deleteSpecialization } from "../../../service/SpecializationService";
import Style from "../css/AddForm.module.css";

export default function DeleteSpecialization({ deleting, onCancel, onDelete }) {
  const [error, setError] = useState("");
  const handleDeleteSpecialization = async () => {
    const response = await deleteSpecialization(deleting?.id);
    if (response) {
      setError("Done");
      if (onDelete) {
        onDelete();
      }
    } else {
      setError("Failed");
    }
  };
  if (deleting.doctors.length > 0) {
    return (
      <div>
        <h5>This specialization has been assigned to one or more doctors.</h5>
        <p>Please, remove the specialization from all the doctors.</p>
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
          Accept
        </Button>
      </div>
    );
  }
  return (
    <div>
      <p>Are you sure to delete this specialization?</p>
      <h5>{deleting?.name}</h5>
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
            handleDeleteSpecialization();
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
