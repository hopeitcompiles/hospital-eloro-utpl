import React, { useContext, useEffect, useState } from "react";
import { Accordion, Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Loading, SessionContext } from "../../../imports";
import { getSpecializationById } from "../../../service/SpecializationService";
import { DEFAULT_SPECIALIZATION_PICTURE } from "../../../utils/GlobalStaticElements";
import DoctorCard from "../../doctors/components/DoctorCard";
import DoctorSmallCard from "../components/DoctorSmallCard";

export default function Specialization() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [specialization, setSpecialization] = useState(null);

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
        <Col xs={12} md={8}>
          <Card className="mb-2">
            <Card.Body className="px-5">
              <Card.Title className="fs-1">{specialization?.name}</Card.Title>
              <Card.Text className="fs-5">
                {specialization?.description}
              </Card.Text>
            </Card.Body>
            <Card.Img
              className="px-5"
              variant="bottom"
              src={
                specialization?.image
                  ? specialization.image
                  : DEFAULT_SPECIALIZATION_PICTURE
              }
            />
          </Card>
        </Col>
        <Col>
          <Accordion defaultActiveKey="0" className="btn-danger">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Details</Accordion.Header>
              <Accordion.Body>
                <Row>
                  {specialization?.registerDate
                    ? "Created on " + specialization?.registerDate
                    : "Missing date of creation"}
                </Row>
                <Row>
                  This specialization is
                  {specialization?.enabled ? " enabled" : " disabled"}
                </Row>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Doctors</Accordion.Header>
              <Accordion.Body>
                {specialization?.doctors?.length > 0
                  ? specialization?.doctors?.map((element) => {
                      return (
                        <DoctorSmallCard key={element.id} doctor={element} />
                      );
                    })
                  : "This specialization hasn't been assigned to a doctor"}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
}
