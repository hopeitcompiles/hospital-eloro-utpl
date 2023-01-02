import axios from "axios";
import { getBaseURL } from "../utils/Urls";
const base_url = getBaseURL();

const LoginUser = async (credentials) => {
  const response = await axios.post(base_url + "login", credentials, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response;
};
const RegisterUser = async (credentials) => {
  const response = await axios.post(base_url + "public/register", credentials, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response;
};
const GetSessionUser = async () => {
  const response = await axios
    .get(`${base_url}whoami`)
    .then((response) => response.data);
  console.log(response);
  return response;
};

export { GetSessionUser, LoginUser, RegisterUser };
