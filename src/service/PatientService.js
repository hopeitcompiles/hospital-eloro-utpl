import { getElementsAsPageableList } from "./QueryService";
import { deleteOnObject, postOneObject } from "./SimpleRequestService";
const DOCTOR_PATH = "patient";
export const getPatientList = (page, search) => {
  return getElementsAsPageableList(page, search, "patient/list");
};
export const registerNewPatient = async (patient) => {
  return await postOneObject(patient, DOCTOR_PATH + "/register");
};
export const deletePatient = async (patient_id) => {
  return await deleteOnObject(patient_id, DOCTOR_PATH + "/delete/");
};
