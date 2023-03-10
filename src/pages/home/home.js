import { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { SessionContext } from "../../imports";

export default function Index() {
  const { sessionUser } = useContext(SessionContext);
  return (
    <div className="App">
      <header className="App-header">
        <Row style={{ marginTop: 80, marginLeft: 50, marginRight: 50 }}>
          <Col sm={3} style={{ margin: 30 }}>
            <img
              style={{ width: 300 }}
              src="https://cdn-icons-png.flaticon.com/512/504/504276.png"
              className="App-logo"
              alt="logo"
            />
          </Col>
          <Col sm={6}>
            <h1>
              Bienvenido/a al sistema online del Hospital Básico de la Zona El
              Oro
              {sessionUser && ` ${sessionUser?.email}`}
            </h1>
          </Col>
        </Row>
      </header>
    </div>
  );
}
