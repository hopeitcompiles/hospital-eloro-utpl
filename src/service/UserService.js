import { getElementsAsPageableList } from "./QueryService";
const getUserList = (page, search) => {
  return getElementsAsPageableList(page, search, "users/list");
};
export { getUserList };
