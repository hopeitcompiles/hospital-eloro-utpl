import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Image,
  Row,
  Table,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { Loading, ModalForm, SessionContext } from "../../../imports";
import { DEFAULT_SPECIALIZATION_PICTURE } from "../../../utils/GlobalStaticElements";
import AddDiseaseForm from "../components/AddDiseaseForm";
import DeleteDisease from "../components/DeleteDisease";

export default function Disease() {
  const { sessionUser, refreshUser } = useContext(SessionContext);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState(null);
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!sessionUser) {
    return <h1>You must log in</h1>;
  }
  return (
    <Container fluid className="px-5 pt-3">
      {(adding === true || editing !== null) && (
        <ModalForm
          title={
            editing !== null
              ? "Editar enfermedad: " + editing.name
              : "Agregar nueva enfermedad"
          }
          setClose={() => {
            setEditing(null);
            setAdding(false);
          }}
        >
          <AddDiseaseForm
            listed={sessionUser.person.diseases}
            editing={editing}
            onCancel={() => {
              setEditing(null);
              setAdding(false);
            }}
            onSuccess={() => {
              refreshUser();
              setAdding(false);
              setEditing(null);
            }}
          />
        </ModalForm>
      )}
      {deleting && (
        <ModalForm title={"Eliminar"} setClose={() => setDeleting(null)}>
          <DeleteDisease
            deleting={deleting}
            onDelete={() => {
              refreshUser();
              setDeleting(null);
            }}
            onCancel={() => setDeleting(null)}
          />
        </ModalForm>
      )}
      <Row>
        <Card className="mb-2">
          <Card.Body className="px-5">
            <Card.Title className="fs-1">
              Paciente: {sessionUser?.person?.name}{" "}
              {sessionUser?.person?.lastName}
            </Card.Title>
            <Card.Header className="fs-3"></Card.Header>
            <br />
            <Button onClick={() => setAdding(true)}>Agregar enfermedad</Button>
            <br />
            <Row>
              {sessionUser?.person?.diseases?.length > 0 ? (
                <Row>
                  <Card.Text className="fs-3">
                    Enfermedades del paciente
                  </Card.Text>

                  <Col style={{ cursor: "pointer" }} md={"auto"}>
                    <Card>
                      <Card.Body>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>ID</th>
                              <th>NOMBRES PACIENTE</th>
                              <th>IDENTIFICACION PACIENTE</th>
                              <th>EDAD PACIENTE</th>
                              <th>FECHA DIAGNOSTICO</th>
                              <th>NOMBRE ENFERMEDAD</th>
                              <th>FECHA REGISTRO</th>
                              <th>OBSERVACIONES</th>
                              <th>ACCION</th>
                            </tr>
                          </thead>
                          <tbody>
                            {sessionUser?.person?.diseases?.map(
                              (disease, index) => (
                                <tr key={disease.id}>
                                  <td>{index + 1}</td>
                                  <td>
                                    {sessionUser.person.name}{" "}
                                    {sessionUser.person.lastName}
                                  </td>
                                  <td>
                                    {sessionUser.person.dni
                                      ? sessionUser.person.dni
                                      : "No especificado"}
                                  </td>
                                  <td>{sessionUser.person.age}</td>
                                  <td>{disease.diagnosticDate}</td>
                                  <td>{disease.name}</td>
                                  <td>{disease.registerDate}</td>
                                  <td>{disease.comments}</td>
                                  <td style={{ width: 170 }}>
                                    <Button
                                      onClick={() => {
                                        setAdding(true);
                                        setEditing(disease);
                                      }}
                                      variant="success"
                                    >
                                      Editar
                                    </Button>
                                    <Button
                                      onClick={() => {
                                        setDeleting(disease);
                                      }}
                                      variant="danger"
                                    >
                                      Eliminar
                                    </Button>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        </Table>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              ) : (
                "You don't have any disease registered"
              )}
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}
