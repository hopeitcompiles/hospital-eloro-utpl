import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Loading } from "../../../imports";
import { getSpecializationById } from "../../../service/SpecializationService";
import { DEFAULT_DOCTOR_PICTURE } from "../../../utils/GlobalStaticElements";

export default function CreateAppointment() {
  const today = new Date(); // Obtener la fecha actual
  const currentDay = today.getDay(); // Obtener el día de la semana (0-6, donde 0 es Domingo)
  const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Calcular la diferencia de días entre hoy y el primer día de esta semana (lunes)

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [specialization, setSpecialization] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [week, setWeek] = useState([]);

  const [turnosDisponibles, setTurnosDisponibles] = useState([
    { day: "Lunes", turnos: ["9:00", "10:00", "11:00", "12:00"] },
    { day: "Martes", turnos: ["9:00", "10:00", "11:00", "12:00"] },
    { day: "Miércoles", turnos: ["9:00", "10:00", "11:00", "12:00"] },
    { day: "Jueves", turnos: ["9:00", "10:00", "11:00", "12:00"] },
    { day: "Viernes", turnos: ["9:00", "10:00", "11:00", "12:00"] },
  ]);
  const [turnosSeleccionados, setTurnosSeleccionados] = useState({});
  const [fecha, setFecha] = useState({});
  // Función que maneja la selección de un turno
  const handleTurnoSeleccionado = (day, turno, date) => {
    // Crear un nuevo objeto de turnos seleccionados
    // Crear un nuevo objeto de turnos seleccionados
    const nuevosTurnosSeleccionados = { ...turnosSeleccionados };
    // Si ya se ha seleccionado un turno para este día, eliminarlo
    if (nuevosTurnosSeleccionados[day] === turno) {
      delete nuevosTurnosSeleccionados[day];
    } else {
      // Si no, eliminar cualquier otro turno seleccionado para este día
      Object.keys(nuevosTurnosSeleccionados).forEach((d) => {
        if (d !== day) {
          delete nuevosTurnosSeleccionados[d];
        }
      });

      // Agregar el nuevo turno seleccionado
      nuevosTurnosSeleccionados[day] = turno;
    }

    // Actualizar el estado con los nuevos turnos seleccionados
    setTurnosSeleccionados(nuevosTurnosSeleccionados);
    setFecha(date);
  };
  // Función que maneja el envío de los turnos seleccionados
  const handleEnviarTurnos = () => {
    // Aquí puedes enviar los turnos seleccionados a un servidor o a otro componente de React
    console.log(turnosSeleccionados, fecha);
  };
  const getSpecialization = async () => {
    setLoading(true);
    const response = await getSpecializationById(id);
    console.log(response);
    setSpecialization(response);
    setLoading(false);
  };
  useEffect(() => {
    getSpecialization();
    let threshold = 0;
    if (today.getDay() >= 5) {
      threshold = 7;
    }
    setWeek([
      new Date(today.setDate(diff + threshold)),
      new Date(today.setDate(diff + 1 + threshold)),
      new Date(today.setDate(diff + 2 + threshold)),
      new Date(today.setDate(diff + 3 + threshold)),
      new Date(today.setDate(diff + 4 + threshold)),
      new Date(today.setDate(diff + 5 + threshold)),
    ]);
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
          <table>
            <thead>
              <tr>
                <th>Día</th>
                <th>Turnos disponibles</th>
              </tr>
            </thead>
            <tbody>
              {turnosDisponibles.map(({ day, turnos }, index) => (
                <tr key={day}>
                  <td>
                    {day} {week[index].getDate()}
                  </td>
                  <td>
                    {turnos.map((turno) => (
                      <Button
                        variant="secondary"
                        style={{ margin: 1, width: 100 }}
                        key={turno}
                        disabled={
                          (turnosSeleccionados[day] &&
                            turnosSeleccionados[day] !== turno) ||
                          week[index].getDate() <= new Date().getDate()
                        }
                        onClick={() =>
                          handleTurnoSeleccionado(day, turno, week[index])
                        }
                      >
                        {turnosSeleccionados[day] === turno ? "X" : turno}
                      </Button>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="2">
                  <button onClick={handleEnviarTurnos}>
                    Enviar turnos seleccionados
                  </button>
                </td>
              </tr>
            </tfoot>
          </table>
        </Row>
      )}
    </Container>
  );
}
