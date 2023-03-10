import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, InputGroup } from "react-bootstrap";
import { registerNewDisease } from "../../../service/PatientService";
import { validateSimilarity } from "../../../utils/Validations";

import Style from "../css/AddForm.module.css";

export default function AddDiseaseForm({
  editing,
  onSuccess,
  onCancel,
  listed,
}) {
  const [error, setError] = useState("");
  const [valid, setValid] = useState(editing ? true : false);
  const [values, setValues] = useState({
    id: editing?.id ? editing?.id : 0,
    name: editing?.name ? editing?.name : "",
    comments: editing?.comments ? editing?.comments : "",
    patientComment: editing?.patientComment ? editing?.patientComment : "",
    diagnosticDate: editing?.diagnosticDate ? editing?.diagnosticDate : "",
  });

  useEffect(() => {
    if (
      values.name === "" ||
      values.comments === "" ||
      values.patientComment === "" ||
      values.diagnosticDate === ""
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
    let can_continue = true;
    e.preventDefault();
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
            "There's another disease with a similar name: " + element.name
          );
          can_continue = false;
          return;
        }
      });
    }
    if (!can_continue) {
      return;
    }

    const response = await registerNewDisease(values);
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
        <Form.Group>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            isInvalid={error !== "" ? true : false}
            isValid={values.name !== "" ? true : false}
            type="text"
            name="name"
            placeholder="Nombre"
            onChange={handleInputChange}
            value={values.name}
          />
          <Form.Text className="text-danger"> {error}</Form.Text>
        </Form.Group>
        <Form.Group>
          <Form.Label>Comentarios</Form.Label>
          <Form.Control
            isValid={values.description !== "" ? true : false}
            type="text"
            name="comments"
            placeholder="Comentarios"
            onChange={handleInputChange}
            value={values.comments}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Comentarios del Paciente</Form.Label>
          <Form.Control
            isValid={values.description !== "" ? true : false}
            type="text"
            name="patientComment"
            placeholder="Comentarios del Paciente"
            onChange={handleInputChange}
            value={values.patientComment}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Fecha de Diagnóstico</Form.Label>
          <Form.Control
            isValid={values.diagnosticDate !== "" ? true : false}
            type="date"
            name="diagnosticDate"
            placeholder="Fecha de Diagnóstico"
            onChange={handleInputChange}
            value={values.diagnosticDate}
          />
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
