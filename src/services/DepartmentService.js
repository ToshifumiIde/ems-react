import axios from "axios";

const DEPARTMENT_REST_API_BASE_URL = "http://localhost:4000/api/departments";

export const listAllDepartments = () => axios.get(DEPARTMENT_REST_API_BASE_URL);
