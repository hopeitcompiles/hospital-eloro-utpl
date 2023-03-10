import React, { useEffect, useRef, useState } from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  CloseButton,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { getAllSpecializations } from "../../../service/SpecializationService";
import { MdOutlineAddCircle as Add } from "react-icons/md";
import { saveSpecializationsToDoctorById } from "../../../service/DoctorService";

export default function ModifingSpecializations({
  assigned,
  doctor_id,
  close,
}) {
  const [specializations, setSpecializations] = useState([]);
  const [assignedList, setAssignedList] = useState(assigned);
  const list = useRef([]);
  const getSpecializations = async () => {
    const response = await getAllSpecializations();
    if (response != null) {
      list.current = response;
      setUpAvailableFiltered();
    }
  };

  const setUpAvailableFiltered = () => {
    const filtered = list.current?.filter((s) => {
      let add = true;
      assignedList.map((element) => {
        if (element.id === s.id) {
          add = false;
        }
      });
      return add;
    });
    setSpecializations(filtered);
  };
  useEffect(() => {
    setUpAvailableFiltered();
  }, [assignedList]);

  useEffect(() => {
    getSpecializations();
  }, []);

  const handleAdd = (index) => {
    setAssignedList([...assignedList, specializations[index]]);
  };

  const handleRemove = (index) => {
    setAssignedList([
      ...assignedList.slice(0, index),
      ...assignedList.slice(index + 1, assignedList.length),
    ]);
  };

  const handleSave = async () => {
    await saveSpecializationsToDoctorById(assignedList, doctor_id);
    close();
  };
  return (
    <Container>
      <Form.Label className="fw-bold">Assigned</Form.Label>
      <br />
      {assignedList?.map((element, index) => {
        return (
          <Badge key={element.id} style={styles.badge}>
            {element.name}&nbsp;&nbsp;
            <CloseButton variant="white" onClick={() => handleRemove(index)} />
          </Badge>
        );
      })}
      <br />
      <Form.Label />
      <Row>
        <Form.Control
          style={{ marginBottom: 8 }}
          type="search"
          placeholder="Search"
        />
      </Row>
      <Form.Label className="fw-bold">Available</Form.Label>
      <br></br>
      {specializations?.map((element, index) => {
        return (
          <Badge key={element.id} style={styles.badge}>
            {element.name}&nbsp;&nbsp;
            <Add
              style={{ cursor: "pointer" }}
              size={20}
              onClick={() => handleAdd(index)}
            />
          </Badge>
        );
      })}
      <Row>
        <Form.Label />
        <ButtonGroup>
          <Button variant="danger" style={{ marginRight: 1 }} onClick={close}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={handleSave}
            style={{ marginLeft: 1 }}
          >
            Save
          </Button>
        </ButtonGroup>
      </Row>
    </Container>
  );
}
const styles = {
  badge: { margin: 5, justifyContent: "center" },
};
