import axios from "axios";
import { getBaseURL } from "../utils/Urls";
const BASE_URL = getBaseURL();

export const postOneObject = async (object, path) => {
  const data = await axios
    .post(BASE_URL + path, JSON.stringify(object), {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((result) => result);
  return data;
};

export const deleteOneObject = async (object_id, path) => {
  const data = await axios
    .get(BASE_URL + path + object_id, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((result) => result);
  return data;
};

export const getOneObject = async (object_id, path) => {
  const data = await axios
    .get(BASE_URL + path + object_id, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    .then((result) => result.data);
  return data;
};
