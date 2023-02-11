import { createContext, useState } from "react";
const ListContext = createContext();

const ListProvider = ({ children }) => {
  const [list, setList] = useState(false);

  return (
    <ListContext.Provider value={{ list, setList }}>
      {children}
    </ListContext.Provider>
  );
};
export { ListProvider, ListContext };
