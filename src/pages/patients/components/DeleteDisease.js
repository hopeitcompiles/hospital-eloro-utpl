import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { deleteDisease } from "../../../service/PatientService";
import Style from "../css/AddForm.module.css";

export default function DeleteDisease({ deleting, onCancel, onDelete }) {
  const [error, setError] = useState("");
  const handleDelete = async () => {
    const response = await deleteDisease(deleting?.id);
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
      <p>¿Estás seguro/a de eliminar esta enfermedad del registro?</p>
      <h5>{deleting?.name}</h5>
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
          Cancelar
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
          Eliminar
        </Button>
      </ButtonGroup>
    </div>
  );
}
