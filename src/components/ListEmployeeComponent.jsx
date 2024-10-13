import React, { useEffect, useState } from "react";
import listEmployees from "../services/EmployeeService";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);

  // API側の従業員情報を同期取得する
  useEffect(() => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="container">
      <h2 className="text-center">List Of Employee</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <th>Employee Uuid</th>
          <th>Employee First Name</th>
          <th>Employee Last Name</th>
          <th>Employee Email Id</th>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.uuid}>
              <td>{employee.uuid}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
