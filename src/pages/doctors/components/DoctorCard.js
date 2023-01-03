import { useContext, useState } from "react";
import {
  RiDeleteBinFill as DeleteBtn,
  RiEdit2Fill as EditBtn,
  RiSearchEyeLine as InspectBtn,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import {
  ListContext,
  ModalForm,
  RoleColor,
  ThemeContext,
} from "../../../imports";
import {
  DefaultDoctorPicture,
  DefaultUserPicture,
} from "../../../utils/GlobalStaticElements";
import cardStyle from "../css/UserCard.module.css";
const default_image = DefaultUserPicture;

export default function DoctorCard({ doctor, editing, deleting }) {
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
          <img src={doctor?.image ? doctor.image : DefaultDoctorPicture} />
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
              src={doctor?.image ? doctor.image : DefaultDoctorPicture}
              onClick={() => setShowModalImage(true)}
            />
          </div>
          <div className={`${cardStyle.information_display} `}>
            <Link
              className={`${cardStyle.link}`}
              to={`/user/${doctor?.ign ? doctor?.ign : doctor?.id}`}
            >
              <h4>
                {doctor?.name} {doctor?.lastName}
              </h4>
              <p>Identification: {doctor?.dni}</p>
            </Link>
            <p>
              {doctor?.user?.email
                ? "e-mail: " + doctor?.user?.email
                : "No user registered"}{" "}
              <br />
              <RoleColor role={doctor?.role} bold={true} />
            </p>
            <p>Specializations: {doctor?.specializations?.length}</p>
          </div>
        </div>
        <div className={`${cardStyle.bottom}`}>
          <div className={`${cardStyle.admin_area}`}>
            <div className={`${cardStyle.checkbox}`}>
              <input type="checkbox" defaultChecked={doctor?.enabled} />
            </div>
            <div className={cardStyle.btn_section}>
              <button
                onClick={() => {
                  if (deleting) {
                    deleting(doctor);
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
                    editing(doctor);
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
