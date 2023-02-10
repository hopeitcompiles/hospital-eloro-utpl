import { createContext, useEffect, useState } from "react";

const THEME_STORAGE_NAME = "theme_pinky";
const initial_theme = window.localStorage.getItem(THEME_STORAGE_NAME);

const ThemeContext = createContext("theme");

function ThemeProvider({ children }) {
  const [mode, setMode] = useState(initial_theme ? initial_theme : "light");

  useEffect(() => {
    document.body.classList.remove(mode === "dark" ? "light" : "dark");
    document.body.classList.add(mode);
    window.localStorage.setItem(THEME_STORAGE_NAME, mode);
  }, [mode]);

  const toExport = useMemo(() => ({ theme: mode, setTheme: setMode }, []));
  return (
    <ThemeContext.Provider value={toExport}>{children}</ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
