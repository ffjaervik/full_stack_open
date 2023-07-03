import axios from "axios";
const url = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAllCountries = () => {
  const request = axios.get(url);
  return request.then((response) => response.data);
};

export { getAllCountries };
