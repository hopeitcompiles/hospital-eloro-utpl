import { useContext, useState } from "react";
import { RiDeleteBinFill as Delete, RiEdit2Fill as Edit } from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  ListContext,
  ModalForm,
  RoleColor,
  SessionContext,
  ThemeContext,
} from "../../../imports";
import { BsCheckCircleFill as Checkbox } from "react-icons/bs";

import {
  DEFAULT_DOCTOR_PICTURE,
  DEFAULT_USER_PICTURE,
  randomBootstrapColorNormal,
  RANDOM_BOOTSTRAP_COLOR,
} from "../../../utils/GlobalStaticElements";
import cardStyle from "../css/UserCard.module.css";
import {
  Badge,
  Col,
  Form,
  OverlayTrigger,
  Row,
  Tooltip,
} from "react-bootstrap";
const default_image = DEFAULT_USER_PICTURE;

export default function DoctorCard({ doctor, editing, deleting }) {
  const { theme } = useContext(ThemeContext);
  const { sessionUser } = useContext(SessionContext);
  const { list } = useContext(ListContext);
  const [showModalImage, setShowModalImage] = useState(false);

  const handleClose = () => {
    setShowModalImage(false);
  };

  return (
    <div>
      {showModalImage && (
        <ModalForm setClose={() => handleClose()}>
          <img src={doctor?.image ? doctor.image : DEFAULT_DOCTOR_PICTURE} />
        </ModalForm>
      )}
      <div
        className={`${theme === "dark" ? cardStyle.dark : cardStyle.light} ${
          list ? cardStyle.list : cardStyle.card
        }`}
      >
        <div className={cardStyle.top}>
          <div className={cardStyle.image_container}>
            <img
              src={doctor?.image ? doctor.image : DEFAULT_DOCTOR_PICTURE}
              onClick={() => setShowModalImage(true)}
            />
          </div>
          <div className={`${cardStyle.information_display} `}>
            <Link
              className={`${cardStyle.link}`}
              to={`/doctors/${doctor?.ign ? doctor?.ign : doctor?.id}`}
            >
              <h4>
                {doctor?.name} {doctor?.lastName}
              </h4>
              <p>{doctor?.phone && "Phone: " + doctor.phone}</p>
            </Link>
            <p>
              {doctor?.user?.email
                ? "e-mail: " + doctor?.user?.email
                : "No user registered"}{" "}
              <br />
              <RoleColor role={doctor?.role} bold={true} />
            </p>
            <p>Specializations: {doctor?.specializations?.length}</p>
            <div>
              {doctor?.specializations?.map((element) => {
                return (
                  <Badge key={element.id} bg={randomBootstrapColorNormal()}>
                    {element?.name}
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
        <div className={`${cardStyle.bottom}`}>
          {sessionUser?.role?.claims?.includes("doctor:write") && (
            <Form style={{ marginTop: 5 }}>
              <Row className="mx-3">
                <Col>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip id="button-tooltip-2">
                        This doctor is
                        {doctor.enabled ? " enabled" : "disabled"}
                      </Tooltip>
                    }
                  >
                    <Form.Floating>
                      <Checkbox
                        size={23}
                        color={doctor.enabled ? "green" : "silver"}
                      />
                    </Form.Floating>
                  </OverlayTrigger>
                  <Form.Label style={{ fontSize: "smaller" }}>
                    {doctor.enabled ? "Enable" : "Disable"}
                  </Form.Label>
                </Col>
                {sessionUser?.role?.claims?.includes("doctor:delete") && (
                  <Col>
                    <Form.Floating>
                      <Delete
                        onClick={() => {
                          if (deleting) {
                            deleting(doctor);
                          }
                        }}
                        className={cardStyle.button}
                        size={25}
                        color="#FF4B2f"
                      />
                    </Form.Floating>
                    <Form.Label style={{ fontSize: "smaller" }}>
                      Delete
                    </Form.Label>
                  </Col>
                )}

                <Col>
                  <Form.Floating>
                    <Edit
                      onClick={() => {
                        if (editing) {
                          editing(doctor);
                        }
                      }}
                      className={cardStyle.button}
                      size={25}
                      color="orange"
                    />
                  </Form.Floating>
                  <Form.Label style={{ fontSize: "smaller" }}>Edit</Form.Label>
                </Col>
              </Row>
            </Form>
          )}
        </div>
        <div className={cardStyle.drop}></div>
      </div>
    </div>
  );
}
