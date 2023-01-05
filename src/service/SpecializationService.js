import {
  postOneObject,
  deleteOneObject,
  getOneObject,
} from "./SimpleRequestService";
import { getAllElements, getElementsAsPageableList } from "./QueryService";

const SPECIALIZATION_PATH = "specialization";
const PAGINATION_SIZE = 5;

export const getSpecializationList = (page, search) => {
  return getElementsAsPageableList(
    page,
    search,
    "specialization/list",
    PAGINATION_SIZE
  );
};
export const getAllSpecializations = () => {
  return getAllElements("specialization/");
};
export const registerNewSpecialization = async (specialization) => {
  return await postOneObject(specialization, SPECIALIZATION_PATH + "/register");
};

export const deleteSpecialization = async (specialization_id) => {
  return await deleteOneObject(
    specialization_id,
    SPECIALIZATION_PATH + "/delete/"
  );
};
export const getSpecializationById = async (specialization_id) => {
  return await getOneObject(specialization_id, SPECIALIZATION_PATH + "/");
};
