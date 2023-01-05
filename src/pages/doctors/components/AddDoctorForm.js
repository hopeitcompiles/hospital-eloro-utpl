import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Form,
  FormGroup,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import { registerNewDoctor } from "../../../service/DoctorService";

import Style from "../css/AddForm.module.css";
import ModifingSpecializations from "./ModifingSpecializations";
export default function AddDoctorForm({ editing, onSuccess, onCancel }) {
  const [error, setError] = useState("Error");
  const [valid, setValid] = useState(editing ? true : false);
  const [editingSpecializations, setEditingSpecializations] = useState(false);
  const [values, setValues] = useState({
    id: editing?.id ? editing?.id : 0,
    name: editing?.name ? editing?.name : "",
    lastName: editing?.lastName ? editing?.lastName : "",
    dni: editing?.dni ? editing?.dni : "",
    phone: editing?.phone ? editing?.phone : "",
    birthdate: editing?.birthdate ? editing?.birthdate : "",
    startDate: editing?.startDate ? editing?.startDate : "",
    enabled: editing?.enabled != null ? editing?.enabled : true,
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
      {editing && (
        <Modal
          show={editingSpecializations}
          onHide={() => setEditingSpecializations(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modify {editing?.name}'s specializations</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ModifingSpecializations
              assigned={editing?.specializations}
              doctor_id={editing.id}
            />
          </Modal.Body>
        </Modal>
      )}
      <Form onSubmit={(e) => handleRegister(e)} className={Style.form}>
        <Form.Control type="hidden" name="id" value={values.id} />{" "}
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleInputChange}
                value={values.name}
              />
            </Col>
            <Col>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last Name"
                onChange={handleInputChange}
                value={values.lastName}
              />
            </Col>
          </Row>
          <Form.Label />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Identification</Form.Label>
              <Form.Control
                required
                minLength={10}
                maxLength={13}
                type="text"
                name="dni"
                placeholder="Identification"
                onChange={handleInputChange}
                value={values.dni}
              />
            </Col>
            <Col>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                accept="number"
                minLength={9}
                maxLength={10}
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={handleInputChange}
                value={values.phone}
              />
            </Col>
          </Row>
          <Form.Label />
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
              <Form.Label>Birthdate</Form.Label>
              <Form.Control
                type="date"
                name="birthdate"
                onChange={handleInputChange}
                value={values.birthdate}
              />
            </Col>
            <Col>
              <Form.Label>Join Date</Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                onChange={handleInputChange}
                value={values.startDate}
              />
            </Col>
          </Row>
        </Form.Group>
        <Form.Label />
        <div>
          <h6>{error.text}</h6>
        </div>
        {editing && (
          <ButtonGroup className={Style.buttongroup}>
            <Button
              style={{ marginInline: 20, marginBottom: 10 }}
              onClick={() => setEditingSpecializations(true)}
            >
              Edit Specializations
            </Button>
          </ButtonGroup>
        )}
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
      </Form>
    </div>
  );
}
