import axios from "axios";

const BASE_URL = "http://localhost:8080/api/jobs";

export const uploadJobWithResume = (formData) => {
  return axios.post(`${BASE_URL}/upload`, formData);
};

export const getAllJobs = () => {
  return axios.get(BASE_URL);
};
