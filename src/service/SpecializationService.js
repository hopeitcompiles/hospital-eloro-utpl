import { postOneObject, deleteOnObject } from "./SimpleRequestService";
import { getElementsAsPageableList } from "./QueryService";

const SPECIALIZATION_PATH = "specialization";

export const getSpecializationList = (page, search) => {
  return getElementsAsPageableList(page, search, "specialization/list");
};

export const registerNewSpecialization = async (specialization) => {
  return await postOneObject(specialization, SPECIALIZATION_PATH + "/register");
};
export const deleteSpecialization = async (specialization_id) => {
  return await deleteOnObject(
    specialization_id,
    SPECIALIZATION_PATH + "/delete/"
  );
};
