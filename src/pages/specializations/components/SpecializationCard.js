import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cardStyle from "../css/Card.module.css";
import { AiFillDelete as Delete } from "react-icons/ai";
import { BiEdit as Edit } from "react-icons/bi";
import { DefaultDoctorPicture } from "../../../utils/GlobalStaticElements";

export default function SpecializationCard({
  specialization,
  editing,
  deleting,
}) {
  const [image, setImage] = useState(
    `https://statics-diariomedico.uecdn.es/cms/2020-07/22-27%20algoritmo%20especialidad.jpg`
  );

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
                src={DefaultDoctorPicture}
                alt={specialization?.name}
              />

              <div className={cardStyle.card__header_text}>
                <Link
                  to={`/specialization/${specialization.id}`}
                  className={cardStyle.link}
                >
                  <h3 className={cardStyle.card__title}>
                    {specialization?.name}
                  </h3>
                </Link>
                <Link
                  to={`/specialization/${specialization.id}`}
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
