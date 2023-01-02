import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  BiChevronRight as Next,
  BiChevronLeft as Previous,
  BiChevronsLeft as Back,
} from "react-icons/bi";
import Style from "./css/Pagination.module.css";
import { ThemeContext } from "../../../imports";
const MAX_BUTTONS = 5;

export default function Pagination({ pagination }) {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [buttons, setButtons] = useState([]);

  const load_page = () => {
    if (
      pagination?.total_pages <= MAX_BUTTONS ||
      pagination?.current < (MAX_BUTTONS / 2).toFixed()
    ) {
      setButtons([
        ...Array(
          pagination?.total_pages < MAX_BUTTONS
            ? pagination?.total_pages
            : MAX_BUTTONS
        ).keys(),
      ]);
      return;
    }
    if (
      pagination?.current >
      pagination?.total_pages - MAX_BUTTONS + MAX_BUTTONS / 2
    ) {
      setButtons(
        Array.from(
          { length: MAX_BUTTONS },
          (_, index) => index + pagination?.total_pages - MAX_BUTTONS
        )
      );
      return;
    }
    setButtons(
      Array.from(
        { length: MAX_BUTTONS },
        (_, index) => index + pagination?.current - (MAX_BUTTONS / 2).toFixed()
      )
    );
  };

  useEffect(() => {
    if (pagination) {
      load_page();
    }
  }, []);

  const handleclick = (value) => {
    if (
      value === pagination?.current ||
      value < 1 ||
      value > pagination?.total_pages
    ) {
      return;
    }
    navigate("?page=" + value);
  };

  const handlelastpage = () => {
    navigate("?page=" + pagination.total_pages);
  };
  const handleClearParams = () => {
    navigate("?page=1");
  };

  if (pagination?.total_items === 0) {
    return (
      <div className={Style.information}>
        <div>
          <p>Nothing no show</p>
        </div>
        <button className={Style.error} onClick={handleClearParams}>
          <Back size={30} />
          &nbsp; Go back Go back to page{" "}
          {pagination.total_pages > 0 ? pagination.total_pages : 1}
        </button>
      </div>
    );
  }

  if (pagination?.current > pagination?.total_pages) {
    return (
      <section className={theme === "dark" && Style.dark}>
        <div className={Style.information}>
          <p>
            There's no page {pagination.current}
            <br />
            <br />
          </p>
        </div>
        <button className={Style.error} onClick={handlelastpage}>
          <Back size={30} />
          &nbsp; Go back to page{" "}
          {pagination.total_pages > 0 ? pagination.total_pages : 1}
        </button>
      </section>
    );
  }
  return (
    <section className={`${theme === "dark" && Style.dark}`}>
      {pagination?.total_pages > 1 && (
        <div className={Style.pagination}>
          <button
            onClick={() => handleclick(pagination.current - 1)}
            className={`${pagination.first && Style.disabled}`}
          >
            <Previous size={20} />
          </button>
          {buttons?.map((number) => (
            <button
              onClick={() => handleclick(number + 1)}
              key={number}
              className={`${pagination.current === number + 1 && Style.active}`}
            >
              {number + 1}
            </button>
          ))}
          <button
            onClick={() => handleclick(pagination.current + 1)}
            className={`${pagination?.last && Style.disabled}`}
          >
            <Next size={20} />
          </button>
        </div>
      )}
      <div className={Style.information}>
        <p>
          Displaying {pagination?.showing} of {pagination?.total_items} elements
        </p>
      </div>
    </section>
  );
}
