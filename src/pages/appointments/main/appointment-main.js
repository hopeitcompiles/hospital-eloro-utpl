import React, { useContext } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { SessionContext } from "../../../imports";

export default function Index() {
  const { sessionUser } = useContext(SessionContext);

  return (
    <Container fluid className="px-5 pt-3">
      <Row>
        <Card className="mb-2">
          <Card.Body className="px-5">
            <Card.Title className="fs-1">
              {sessionUser?.role?.name}: {sessionUser?.person?.name}{" "}
              {sessionUser?.person?.lastName}
              <br />
              {sessionUser?.person?.appointments > 0
                ? "Tienes citas registradas"
                : "No tiene citas programadas"}{" "}
            </Card.Title>
            <Card.Header className="fs-3"></Card.Header>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}
