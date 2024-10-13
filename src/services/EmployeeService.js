import axios from "axios";

const REST_API_BASE_URL = "http://localhost:4000/api/employees";

export const listEmployees = () => axios.get(REST_API_BASE_URL);

export const createEmployee = (employee) => axios.post(REST_API_BASE_URL, employee);

export const getEmployee = (uuid) => axios.get(REST_API_BASE_URL + "/" + uuid);

export const updateEmployee = (uuid, employee) => axios.put(REST_API_BASE_URL + "/" + uuid, employee);

export const deleteEmployee = (uuid) => axios.delete(REST_API_BASE_URL + "/" + uuid);