import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { registerNewSpecialization } from "../../../service/SpecializationService";

import Style from "../css/AddForm.module.css";
export default function AddSpecializationForm({
  editing,
  onSuccess,
  onCancel,
}) {
  const [error, setError] = useState("Error");
  const [values, setValues] = useState({
    id: editing?.id ? editing?.id : 0,
    name: editing?.name ? editing?.name : "",
    description: editing?.description ? editing?.description : "",
  });

  const handleInputChange = (event) => {
    setError("");
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    const response = await registerNewSpecialization(values);
    if (response) {
      setError("Done");
      if (onSuccess) {
        onSuccess();
      }
    } else {
      setError("Failed");
    }
  };
  return (
    <div>
      <form onSubmit={(e) => handleRegister(e)} className={Style.form}>
        <input type="hidden" name="id" value={values.id} />
        <input
          className={Style.input}
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleInputChange}
          value={values.name}
        />
        <input
          className={Style.input}
          type="text"
          name="description"
          placeholder="Description"
          onChange={handleInputChange}
          value={values.description}
        />
        <div>
          <h6>{error.text}</h6>
        </div>
        <ButtonGroup className={Style.buttongroup}>
          <Button
            variant="danger"
            className={`${Style.button}`}
            onClick={() => {
              if (onCancel) {
                onCancel();
              }
            }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className={`${Style.button}`}
            disabled={
              values.description !== "" && values.name !== "" ? false : true
            }
            type="submit"
          >
            {editing ? "Update" : "Register"}
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}
