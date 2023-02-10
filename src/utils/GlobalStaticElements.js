export const DEFAULT_USER_PICTURE =
  "https://blog.cpanel.com/wp-content/uploads/2019/08/user-01.png";
export const DEFAULT_DOCTOR_PICTURE =
  "https://clinic-cloud.com/wp-content/uploads/2016/04/origen-de-la-medicina-640x450.jpg";
export const DEFAULT_SPECIALIZATION_PICTURE =
  "https://statics-diariomedico.uecdn.es/cms/2020-07/22-27%20algoritmo%20especialidad.jpg";
export const BOOTSTRAP_COLORS = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "dark",
  "light",
];
export const randomBootstrapColorNormal = () => {
  return BOOTSTRAP_COLORS[getRandomInt(BOOTSTRAP_COLORS.length - 1)];
};

function getRandomInt(max) {
  const crypto = window.crypto || window.Crypto;
  var array = new Uint32Array(1);
  const value = String(crypto.getRandomValues(array)[0])[0];
  return parseInt(value);
}
