import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cardStyle from "../css/Card.module.css";
import { MdDeleteForever as Delete } from "react-icons/md";
import { BiEdit as Edit } from "react-icons/bi";
import {
  DEFAULT_DOCTOR_PICTURE,
  DEFAULT_SPECIALIZATION_PICTURE,
} from "../../../utils/GlobalStaticElements";
import { BsCheckCircleFill as Checkbox } from "react-icons/bs";
import { Col, Form, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { SessionContext } from "../../../imports";

export default function SpecializationCard({
  specialization,
  editing,
  deleting,
}) {
  const { sessionUser } = useContext(SessionContext);
  const [image, setImage] = useState(DEFAULT_SPECIALIZATION_PICTURE);

  useEffect(() => {
    if (specialization?.image) {
      setImage(specialization.image);
    }
  }, []);

  return (
    <section>
      <div className={cardStyle.cards}>
        <div className={cardStyle.card}>
          <img src={image} className={cardStyle.card__image} alt="" />
          <div className={cardStyle.card__overlay}>
            <div className={cardStyle.card__header}>
              <svg
                className={cardStyle.card__arc}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path />
              </svg>
              <img
                className={cardStyle.card__thumb}
                src={DEFAULT_DOCTOR_PICTURE}
                alt={specialization?.name}
              />

              <div className={cardStyle.card__header_text}>
                <Link
                  to={`/specializations/${specialization.id}`}
                  className={cardStyle.link}
                >
                  <h3 className={cardStyle.card__title}>
                    {specialization?.name}
                  </h3>
                </Link>
                <Link
                  to={`/specializations/${specialization.id}`}
                  className={cardStyle.link}
                >
                  <span className={cardStyle.card__status}>
                    {specialization?.doctors
                      ? specialization.doctors.length + " "
                      : "0 "}
                    doctors
                  </span>
                </Link>
              </div>
            </div>
            <p className={cardStyle.card__description}>
              {specialization?.description}
            </p>

            <div className={cardStyle.card__buttons}>
              <Form>
                <Row className="mx-3">
                  <Col>
                    <OverlayTrigger
                      placement="top"
                      overlay={
                        <Tooltip id="button-tooltip-2">
                          This specialization is{" "}
                          {specialization.enabled ? " enabled" : "disabled"}
                        </Tooltip>
                      }
                    >
                      <Form.Floating>
                        <Checkbox
                          size={25}
                          color={specialization.enabled ? "green" : "silver"}
                        />
                      </Form.Floating>
                    </OverlayTrigger>

                    <Form.Label>
                      {specialization.enabled ? "Enable" : "Disable"}
                    </Form.Label>
                  </Col>

                  <Col>
                    <Form.Floating>
                      <Delete
                        onClick={() => {
                          if (deleting) {
                            deleting(specialization);
                          }
                        }}
                        className={cardStyle.button}
                        size={30}
                        color="#FF4B2f"
                      />
                    </Form.Floating>
                    <Form.Label>Delete</Form.Label>
                  </Col>

                  <Col>
                    <Form.Floating>
                      <Edit
                        onClick={() => {
                          if (editing) {
                            editing(specialization);
                          }
                        }}
                        className={cardStyle.button}
                        size={30}
                        color="orange"
                      />
                    </Form.Floating>
                    <Form.Label>Edit</Form.Label>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
