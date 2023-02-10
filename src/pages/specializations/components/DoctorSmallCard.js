import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DEFAULT_DOCTOR_PICTURE } from "../../../utils/GlobalStaticElements";

export default function DoctorSmallCard({ doctor }) {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Link to={`/doctors/${doctor?.ign ? doctor?.ign : doctor?.id}`}>
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
          </Link>
        </Row>
      </Card.Body>
    </Card>
  );
}
