import axios from "axios";

const DEPARTMENT_REST_API_BASE_URL = "http://localhost:4000/api/departments";

export const listAllDepartments = () => axios.get(DEPARTMENT_REST_API_BASE_URL);

export const createDepartment = (department) => axios.post(DEPARTMENT_REST_API_BASE_URL, department);

export const getDepartmentByUuid = (uuid) => axios.get(DEPARTMENT_REST_API_BASE_URL + "/" + uuid);

export const updateDepartmentByUuid = (uuid, department) => axios.put(DEPARTMENT_REST_API_BASE_URL + "/" + uuid , department);