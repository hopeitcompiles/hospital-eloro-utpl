import { createContext, useState } from "react";
const ListContext = createContext();

const ListProvider = ({ children }) => {
  const [list, setList] = useState(false);

  const data = { list, setList };

  return <ListContext.Provider value={data}>{children}</ListContext.Provider>;
};
export { ListProvider, ListContext };
