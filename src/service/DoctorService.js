import { getElementsAsPageableList } from "./QueryService";

export const getDoctorList = (page, search) => {
  return getElementsAsPageableList(page, search, "doctor/list");
};
