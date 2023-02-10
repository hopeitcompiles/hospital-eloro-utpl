import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Loading } from "../../../imports";
import { getSpecializationById } from "../../../service/SpecializationService";
import { DEFAULT_DOCTOR_PICTURE } from "../../../utils/GlobalStaticElements";

export default function CreateAppointment() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [specialization, setSpecialization] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const getSpecialization = async () => {
    setLoading(true);
    const response = await getSpecializationById(id);
    console.log(response);
    setSpecialization(response);
    setLoading(false);
  };
  useEffect(() => {
    getSpecialization();
  }, []);

  if (loading) {
    return <Loading />;
  }
  return (
    <Container fluid className="px-5 pt-3">
      <Row>
        <Card className="mb-2">
          <Card.Body className="px-5">
            <Card.Title className="fs-1">
              Registrar cita médica para la especialidad: {specialization?.name}
            </Card.Title>
            <Card.Header className="fs-3"></Card.Header>
            <Card.Text className="fs-4">Seleccione el médico</Card.Text>
            <Row>
              {specialization?.doctors?.length > 0
                ? specialization?.doctors?.map((doctor) => {
                    return (
                      <Col
                        key={doctor.id}
                        style={{ cursor: "pointer" }}
                        md={"auto"}
                        onClick={() => setDoctor(doctor)}
                      >
                        <Card>
                          <Card.Body>
                            <Image
                              style={{
                                height: 120,
                                borderWidth: "1px",
                                borderColor: "black",
                              }}
                              src={
                                doctor?.image
                                  ? doctor.image
                                  : DEFAULT_DOCTOR_PICTURE
                              }
                            ></Image>
                            <Col style={{ fontWeight: "bold" }}>
                              {doctor.name} {doctor.lastName}
                            </Col>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })
                : "This specialization hasn't been assigned to a doctor"}
            </Row>
          </Card.Body>
        </Card>
      </Row>
      {doctor !== null && (
        <Row>
          <p style={{ fontWeight: "bold" }}>
            {`Citas disponibles para ${specialization.name} con
            ${
              doctor?.gender
                ? doctor.gender === "FEMALE"
                  ? " la doctora"
                  : " el doctor"
                : " el/la médico "
            }
            ${doctor.name} ${doctor.lastName}`}
          </p>
          aquí ESA COSA
        </Row>
      )}
    </Container>
  );
}
