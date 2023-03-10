import { getElementsAsPageableList } from "./QueryService";
import { deleteOneObject, postOneObject } from "./SimpleRequestService";
const USER_PATH = "patient";
export const getPatientList = (page, search) => {
  return getElementsAsPageableList(page, search, "patient/list");
};
export const registerNewPatient = async (patient) => {
  return await postOneObject(patient, USER_PATH + "/register");
};
export const registerNewDisease = async (disease) => {
  return await postOneObject(disease, USER_PATH + "/disease/register");
};
export const registerNewPatientFromAuthForm = async (patient) => {
  return await postOneObject(patient, "register");
};
export const deletePatient = async (patient_id) => {
  return await deleteOneObject(patient_id, USER_PATH + "/delete/");
};
export const deleteDisease = async (disease_id) => {
  return await deleteOneObject(disease_id, USER_PATH + "/disease/delete/");
};
