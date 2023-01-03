import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, InputGroup } from "react-bootstrap";
import { registerNewDoctor } from "../../../service/DoctorService";

import Style from "../css/AddForm.module.css";
export default function AddDoctorForm({ editing, onSuccess, onCancel }) {
  const [error, setError] = useState("Error");
  const [valid, setValid] = useState(editing ? true : false);
  const [values, setValues] = useState({
    id: editing?.id ? editing?.id : 0,
    name: editing?.name ? editing?.name : "",
    lastName: editing?.lastName ? editing?.lastName : "",
    dni: editing?.dni ? editing?.dni : "",
    phone: editing?.phone ? editing?.phone : "",
  });

  useEffect(() => {
    if (
      values.name === "" ||
      values.lastName === "" ||
      values.dni === "" ||
      values.phone === ""
    ) {
      setValid(false);
    } else {
      setValid(true);
    }
  }, [values]);

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
    const response = await registerNewDoctor(values);
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
        <InputGroup>
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
            name="lastName"
            placeholder="Last Name"
            onChange={handleInputChange}
            value={values.lastName}
          />
        </InputGroup>
        <input
          className={Style.input}
          type="text"
          name="dni"
          placeholder="Identification"
          onChange={handleInputChange}
          value={values.dni}
        />
        <input
          className={Style.input}
          maxLength={10}
          type="text"
          name="phone"
          placeholder="Phone"
          onChange={handleInputChange}
          value={values.phone}
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
            disabled={!valid}
            type="submit"
          >
            {editing ? "Update" : "Register"}
          </Button>
        </ButtonGroup>
      </form>
    </div>
  );
}
