import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { DEFAULT_DOCTOR_PICTURE } from "../../../utils/GlobalStaticElements";

export default function DoctorSmallCard({ doctor }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col md={2}>
            <Image
              style={{
                height: 30,
                borderRadius: "50%",
                borderWidth: "1px",
                borderColor: "black",
              }}
              src={doctor?.image ? doctor.image : DEFAULT_DOCTOR_PICTURE}
            ></Image>
          </Col>
          <Col md={6}>
            {doctor.name} {doctor.lastName}
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
