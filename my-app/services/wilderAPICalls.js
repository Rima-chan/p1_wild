import http from "../api-config";
import axios from "axios";

const URL = "http://localhost:8080/api/wilders";

export const getAll = async () => {
  try {
    const response = await axios.get(`${URL}/`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const create = async (data) => {
  try {
    const response = await axios.post(`${URL}/`, data);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const update = async (id, data) => {
  try {
    const response = await axios.put(`${URL}/${id}/`, data);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
export const deleteById = async (id) => {
  try {
    const response = await axios.delete(`${URL}/${id}`);
    return response.data;
  } catch (error) {
    return error.response;
  }
};
