import { getElementsAsPageableList } from "./QueryService";
import {
  deleteOneObject,
  getOneObject,
  postOneObject,
} from "./SimpleRequestService";
const DOCTOR_PATH = "doctor";
export const getDoctorList = (page, search) => {
  return getElementsAsPageableList(page, search, "doctor/list");
};
export const registerNewDoctor = async (doctor) => {
  return await postOneObject(doctor, DOCTOR_PATH + "/register");
};
export const deleteDoctor = async (doctor_id) => {
  return await deleteOneObject(doctor_id, DOCTOR_PATH + "/delete/");
};

export const getDoctorById = async (doctor_id) => {
  return await getOneObject(doctor_id, DOCTOR_PATH + "/");
};
export const saveSpecializationsToDoctorById = async (
  specializations,
  doctor_id
) => {
  return await postOneObject(
    specializations,
    DOCTOR_PATH + "/" + doctor_id + "/specializations"
  );
};
