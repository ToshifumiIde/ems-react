import axios from "axios";

const REST_API_BASE_URL = "http://localhost:4000/api/employees";

const listEmployees = () => axios.get(REST_API_BASE_URL);

export default listEmployees;
