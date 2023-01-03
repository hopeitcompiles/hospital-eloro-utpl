import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { deleteDoctor } from "../../../service/DoctorService";
import Style from "../css/AddForm.module.css";

export default function DeleteDoctor({ deleting, onCancel, onDelete }) {
  const [error, setError] = useState("");
  const handleDelete = async () => {
    const response = await deleteDoctor(deleting?.id);
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
      <p>Are you sure to delete this doctor?</p>
      <h5>
        {deleting?.name} {deleting?.lastName}
      </h5>
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
