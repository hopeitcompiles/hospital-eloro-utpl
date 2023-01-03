const HOSTX = "http://localhost:8080/";
const HOST = "http://localhost:8080/";
const APP = "app";
const getBaseURL = () => {
  return `${HOST}`;
};

const getAppURL = () => {
  return `${HOST}${APP}`;
};
export { getAppURL, getBaseURL };
