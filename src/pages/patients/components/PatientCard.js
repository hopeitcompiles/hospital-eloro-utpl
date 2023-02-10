import { useContext, useState } from "react";
import {
  RiDeleteBinFill as DeleteBtn,
  RiEdit2Fill as EditBtn,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  ListContext,
  ModalForm,
  RoleColor,
  ThemeContext,
} from "../../../imports";
import { DEFAULT_DOCTOR_PICTURE } from "../../../utils/GlobalStaticElements";
import cardStyle from "../css/UserCard.module.css";

export default function PatientCard({ patient, editing, deleting }) {
  const { theme } = useContext(ThemeContext);
  const { list } = useContext(ListContext);
  const [showModalImage, setShowModalImage] = useState(false);

  const handleClose = () => {
    setShowModalImage(false);
  };

  return (
    <div>
      {showModalImage && (
        <ModalForm setClose={() => handleClose()}>
          <img src={patient?.image ? patient.image : DEFAULT_DOCTOR_PICTURE} />
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
              src={patient?.image ? patient.image : DEFAULT_DOCTOR_PICTURE}
              onClick={() => setShowModalImage(true)}
            />
          </div>
          <div className={`${cardStyle.information_display} `}>
            <Link
              className={`${cardStyle.link}`}
              to={`/user/${patient?.ign ? patient?.ign : patient?.id}`}
            >
              <h4>
                {patient?.name} {patient?.lastName}
              </h4>
              <p>Identification: {patient?.dni}</p>
            </Link>
            <p>
              {patient?.user?.email
                ? "e-mail: " + patient?.user?.email
                : "No user registered"}{" "}
              <br />
              <RoleColor role={patient?.role} bold={true} />
            </p>
          </div>
        </div>
        <div className={`${cardStyle.bottom}`}>
          <div className={`${cardStyle.admin_area}`}>
            <div className={`${cardStyle.checkbox}`}>
              <input type="checkbox" defaultChecked={patient?.enabled} />
            </div>
            <div className={cardStyle.btn_section}>
              <button
                onClick={() => {
                  if (deleting) {
                    deleting(patient);
                  }
                }}
                className={`${cardStyle.delete} ${cardStyle.no_border_button}`}
              >
                <DeleteBtn size={25} />
              </button>
              <button
                className={`${cardStyle.edit} ${cardStyle.no_border_button}`}
                onClick={() => {
                  if (editing) {
                    editing(patient);
                  }
                }}
              >
                <EditBtn size={25} />
              </button>
            </div>
          </div>
          <div className={cardStyle.drop}></div>
        </div>
      </div>
    </div>
  );
}
