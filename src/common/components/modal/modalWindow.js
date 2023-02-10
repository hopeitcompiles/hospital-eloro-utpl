import style from "./css/Modal.module.css";
import { MdCancel as Close } from "react-icons/md";

export default function ModalWindow({ children, setClose, title }) {
  return (
    <div onClick={setClose} className={style.overlay}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${title ? style.container : style.body_only}`}
      >
        {title && (
          <div className={style.title}>
            <h1>{title}</h1>
          </div>
        )}
        <div onClick={setClose} className={style.close}>
          <Close size={32} />
        </div>
        {children}
      </div>
    </div>
  );
}
