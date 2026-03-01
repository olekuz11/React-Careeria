import axios from "axios";

// const baseUrl = "https://localhost:5001/api/authentication"
const baseUrl =
  "https://northwindrestapi-olena-eyf2g4c5evdccmc7.canadacentral-01.azurewebsites.net/api/authentication";

const authenticate = (userForAuth) => {
  const request = axios.post(baseUrl, userForAuth);
  return request.then((response) => response);
};

const authService = { authenticate };
export default authService;