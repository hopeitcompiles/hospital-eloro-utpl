import { createContext, useEffect, useState } from "react";
import { en_US } from "../../languaje/en_US";
import { es_EC } from "../../languaje/es_EC";

const LanguajeContext = createContext("languaje");

const LANGUAJE_STORAGE_NAME = "languaje_hospital";
const initial_languaje = window.localStorage.getItem(LANGUAJE_STORAGE_NAME);

function LanguajeProvider({ children }) {
  const [languaje, setLanguaje] = useState(
    initial_languaje ? (initial_languaje === es_EC.NAME ? es_EC : en_US) : es_EC
  );

  useEffect(() => {
    window.localStorage.setItem(LANGUAJE_STORAGE_NAME, languaje.NAME);
  }, [languaje]);

  const toExport = { languaje, setLanguaje };

  return (
    <LanguajeContext.Provider value={toExport}>
      {children}
    </LanguajeContext.Provider>
  );
}

export { LanguajeContext, LanguajeProvider };
