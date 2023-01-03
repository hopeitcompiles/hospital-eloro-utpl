import { getElementsAsPageableList } from "./QueryService";
import { deleteOnObject, postOneObject } from "./SimpleRequestService";
const DOCTOR_PATH = "doctor";
export const getDoctorList = (page, search) => {
  return getElementsAsPageableList(page, search, "doctor/list");
};
export const registerNewDoctor = async (doctor) => {
  return await postOneObject(doctor, DOCTOR_PATH + "/register");
};
export const deleteDoctor = async (doctor_id) => {
  return await deleteOnObject(doctor_id, DOCTOR_PATH + "/delete/");
};
