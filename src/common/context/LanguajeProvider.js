import { createContext, useEffect, useState } from "react";
import { en_US } from "../../languaje/en_US";
import { es_EC } from "../../languaje/es_EC";

const LanguajeContext = createContext("languaje");

const LANGUAJE_STORAGE_NAME = "languaje_hospital";
const initial_languaje = window.localStorage.getItem(LANGUAJE_STORAGE_NAME);

function LanguajeProvider({ children }) {
  const _languaje = initial_languaje ? initial_languaje : es_EC;
  const [languaje, setLanguaje] = useState(
    _languaje === es_EC.NAME ? es_EC : en_US
  );

  useEffect(() => {
    window.localStorage.setItem(LANGUAJE_STORAGE_NAME, languaje.NAME);
  }, [languaje]);

  return (
    <LanguajeContext.Provider value={{ languaje, setLanguaje }}>
      {children}
    </LanguajeContext.Provider>
  );
}

export { LanguajeContext, LanguajeProvider };
