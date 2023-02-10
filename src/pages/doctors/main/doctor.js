import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Loading } from "../../../imports";
import { getDoctorById } from "../../../service/DoctorService";
import {
  DEFAULT_DOCTOR_PICTURE,
  DEFAULT_SPECIALIZATION_PICTURE,
} from "../../../utils/GlobalStaticElements";

export default function Doctor() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDoctor = async () => {
    setLoading(true);
    const response = await getDoctorById(id);
    if (response != null) {
      setDoctor(response);
    }
    setLoading(false);
  };
  useEffect(() => {
    getDoctor();
  }, []);

  if (loading) {
    return <Loading />;
  }
  if (!doctor) {
    return <h1>404 this doctor doesn't exist</h1>;
  }
  return (
    <Container fluid className="px-5 pt-3">
      <Row>
        <Card className="mb-2">
          <Card.Body className="px-5">
            <Card.Title className="fs-1">
              Doctor/a: {doctor?.name} {doctor?.lastName}
            </Card.Title>
            <Card.Header className="fs-3"></Card.Header>
            <Row>
              {doctor?.specializations?.length > 0 ? (
                <Row>
                  <Card.Text className="fs-3">Especializaciones</Card.Text>
                  {doctor?.specializations?.map((specialization) => {
                    return (
                      <Col
                        key={specialization.id}
                        style={{ cursor: "pointer" }}
                        md={"auto"}
                      >
                        <Link
                          style={{ textDecoration: "none" }}
                          to={"/specializations/" + specialization.id}
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
                                  specialization?.image
                                    ? specialization.image
                                    : DEFAULT_SPECIALIZATION_PICTURE
                                }
                              />
                              <Col md="auto">{specialization.name}</Col>
                            </Card.Body>
                          </Card>
                        </Link>
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                "This specialization hasn't been assigned to a doctor"
              )}
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}
