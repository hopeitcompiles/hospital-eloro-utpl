import React, { useState } from "react";
import { Button, ButtonGroup, Form } from "react-bootstrap";
import { registerNewSpecialization } from "../../../service/SpecializationService";
import { validateSimilarity } from "../../../utils/Validations";

import Style from "../css/AddForm.module.css";
export default function AddSpecializationForm({
  editing,
  onSuccess,
  onCancel,
  listed,
}) {
  const [error, setError] = useState("");
  const [values, setValues] = useState({
    id: editing?.id ? editing?.id : 0,
    name: editing?.name ? editing?.name : "",
    description: editing?.description ? editing?.description : "",
    enabled: editing?.enabled != null ? editing?.enabled : true,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name, value);

    if (name === "name") {
      setError("");
    }
    setValues({
      ...values,
      [name]: value,
    });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(values);
    let can_continue = true;
    if (listed) {
      listed.forEach((element) => {
        if (element.id === values.id || !element.id) {
          return;
        }
        console.log("Values", element, values.name);
        const similarity = validateSimilarity(element.name, values.name);
        if (similarity == 1) {
          setError(element.name + " is already registered");
          can_continue = false;
          return;
        }
        if (similarity >= 0.8) {
          setError(
            "There's another specialization with a similar name: " +
              element.name
          );
          can_continue = false;
          return;
        }
      });
    }
    if (!can_continue) {
      return;
    }
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
      <Form onSubmit={(e) => handleRegister(e)} className={Style.form}>
        <Form.Control type="hidden" name="id" value={values.id} />
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            isInvalid={error !== "" ? true : false}
            isValid={values.name !== "" ? true : false}
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleInputChange}
            value={values.name}
          />
          <Form.Text className="text-danger"> {error}</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control
            isValid={values.description !== "" ? true : false}
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleInputChange}
            value={values.description}
          />
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Label />
          <Form.Check
            type="checkbox"
            name="enabled"
            label="Enabled"
            onChange={(e) =>
              handleInputChange({
                target: { name: "enabled", value: !values.enabled },
              })
            }
            value={values.enabled}
            checked={values.enabled}
          />
          <Form.Label />
        </Form.Group>

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
              values.description === "" || values.name === "" || error !== ""
                ? true
                : false
            }
            type="submit"
          >
            {editing ? "Update" : "Register"}
          </Button>
        </ButtonGroup>
      </Form>
    </div>
  );
}
