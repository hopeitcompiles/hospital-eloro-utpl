import { useContext } from "react";
import { SessionContext } from "../../imports";

export default function Index() {
  const { sessionUser } = useContext(SessionContext);
  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://cdn-icons-png.flaticon.com/512/504/504276.png"
          className="App-logo"
          alt="logo"
        />
        <h1>
          Bienvenido/a al sistema online del Hospital Básico de la Zona El Oro
          {sessionUser && ` ${sessionUser?.email}`}
        </h1>
      </header>
    </div>
  );
}
