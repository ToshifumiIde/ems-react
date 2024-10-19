import React, { useEffect, useState } from "react";
import {
  deleteDepartmentByUuid,
  listAllDepartments,
} from "../services/DepartmentService";
import { Link, useNavigate } from "react-router-dom";

const ListDepartmentComponent = () => {
  const [departments, setDepartments] = useState([]);

  const navigator = useNavigate();

  useEffect(() => {
    getAllDepartments();
  }, []);

  function getAllDepartments() {
    listAllDepartments()
      .then((response) => {
        console.log(response.data);
        setDepartments(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function editDepartment(uuid) {
    navigator(`/edit-department/${uuid}`);
  }

  function removeDepartment(uuid) {
    deleteDepartmentByUuid(uuid)
      .then((response) => {
        getAllDepartments();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="container">
      <h2 className="text-center">List of Departments</h2>
      <Link to="/add-department" className="btn btn-primary mb-2">
        Add Department
      </Link>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Department Id</th>
            <th>Department Name</th>
            <th>Department Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.uuid}>
              <td>{department.uuid}</td>
              <td>{department.name}</td>
              <td>{department.description}</td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => {
                    editDepartment(department.uuid);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    removeDepartment(department.uuid);
                  }}
                  style={{ marginLeft: "10px" }}
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

export default ListDepartmentComponent;
