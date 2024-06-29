import axios from "axios";
import { AppURL } from "./AppURL";
const axiosInstance = axios.create({
  baseURL: AppURL.BaseURL,
  headers: {
    accept: 'application/json',
    "x-api-key": AppURL.API_KEY
  }
});
const axiosInstanceShop = axios.create({
  baseURL: AppURL.BaseURLSHOP,
  headers: {
    accept: 'application/json',
    "x-api-key": AppURL.API_KEY
  }
});
const axiosInstanceAdmin = axios.create({
  baseURL: AppURL.BaseURLAdmin,
  headers: {
    accept: 'application/json',
    "x-api-key": AppURL.API_KEY
  }
});
export { axiosInstance, axiosInstanceShop,axiosInstanceAdmin }