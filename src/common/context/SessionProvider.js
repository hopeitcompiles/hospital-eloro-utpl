import { createContext, useEffect, useState } from "react";
import handleErrorResponse from "../../utils/ErrorHttpHandler";
import {
  GetSessionUser,
  LoginUser,
} from "./../../service/AuthenticationService";
import { setAxiosAuthorization } from "./../../utils/AxiosClient";

const TOKEN_STORAGE_NAME = "a520cb1e-f908-4320-b3fe-b5780f094fc2";
const initialToken = window.localStorage.getItem(TOKEN_STORAGE_NAME);

const SessionContext = createContext("session");

function SessionProvider({ children }) {
  const [session, setSession] = useState(null);

  const getCurrentUser = async () => {
    const user = await GetSessionUser();
    setSession(user);
  };

  useEffect(() => {
    if (initialToken?.startsWith("Bearer ")) {
      setAxiosAuthorization(initialToken);
      getCurrentUser();
    }
    return () => {
      setSession(null);
      setAxiosAuthorization(null);
    };
  }, []);

  const login = async (credentials) => {
    try {
      const response = await LoginUser(credentials);
      const token = response.headers["authorization"];

      if (token.startsWith("Bearer ")) {
        window.localStorage.setItem(TOKEN_STORAGE_NAME, token);
        setAxiosAuthorization(token);
        await getCurrentUser();
        return `Welcome back, ${session?.name}`;
      } else {
        return "Wrong email or password";
      }
    } catch (er) {
      return handleErrorResponse(er);
    }
  };

  const logout = () => {
    setSession(null);
    setAxiosAuthorization(null);
    window.localStorage.removeItem(TOKEN_STORAGE_NAME);
  };

  const toExport = useMemo(
    () => ({ sessionUser: session, LogIn: login, LogOut: logout }),
    []
  );
  return (
    <SessionContext.Provider value={toExport}>
      {children}
    </SessionContext.Provider>
  );
}

export { SessionContext, SessionProvider };
