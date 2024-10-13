import React, { useEffect, useState } from "react";
import { listEmployees, deleteEmployee } from "../services/EmployeeService";
import { useNavigate } from "react-router-dom";

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const navigator = useNavigate();

  // API側の従業員情報を同期取得する
  useEffect(() => {
    getAllEmployees();
  }, []);

  /**
   * REST API を用いて従業員を全件取得する
   * setEmployees()に取得データを渡す
   */
  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => console.error(error));
  }

  /**
   * 新規従業員を生成する
   */
  function addNewEmployee() {
    navigator("/add-employee");
  }

  /**
   * 指定したuuidの従業員を編集する
   * @param uuid
   */
  function editEmployee(uuid) {
    navigator(`/edit-employee/${uuid}`);
  }

  /**
   * 指定したuuidの従業員を削除する
   * 従業員の削除に成功した場合、再度全従業員を取得する
   * @param uuid
   */
  function removeEmployee(uuid) {
    console.log(uuid);
    deleteEmployee(uuid)
      .then((response) => {
        getAllEmployees();
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className="container">
      <h2 className="text-center">List Of Employee</h2>
      <button className="btn btn-primary mb-2" onClick={addNewEmployee}>
        Add Employee
      </button>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Employee Uuid</th>
            <th>Employee First Name</th>
            <th>Employee Last Name</th>
            <th>Employee Email Id</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.uuid}>
              <td>{employee.uuid}</td>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => editEmployee(employee.uuid)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => removeEmployee(employee.uuid)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListEmployeeComponent;
