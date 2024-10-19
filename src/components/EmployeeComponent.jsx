import React, { useEffect, useState } from "react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../services/EmployeeService";
import { getDepartmentsList } from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentUuid, setDepartmentUuid] = useState("");
  const [departmentsList, setDepartmentsList] = useState([]);
  const navigator = useNavigate();
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });

  const { uuid } = useParams();

  useEffect(() => {
    getDepartmentsList()
      .then((response) => {
        console.log(response.data);
        setDepartmentsList(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    if (uuid) {
      getEmployee(uuid)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
          setDepartmentUuid(response.data.departmentUuid);
        })
        .catch((error) => console.error(error));
    }
  }, [uuid]);

  function setPageTitle() {
    if (uuid) {
      return <h2 className="text-center">Update Employee</h2>;
    } else {
      return <h2 className="text-center">Add Employee</h2>;
    }
  }

  /**
   * uuidの有無に応じて、createまたはupdateのAPIを実行する
   * useStateに格納された値を元にrequestBodyを成形し、リクエストに詰めて送信する
   *
   */
  function saveOrUpdateEmployee(e) {
    e.preventDefault();
    if (validateForm()) {
      const employee = {
        firstName,
        lastName,
        email,
        departmentUuid,
      };

      if (uuid) {
        updateEmployee(uuid, employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }

      if (!uuid) {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            navigator("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (firstName.trim()) {
      errorsCopy.firstName = "";
    } else {
      errorsCopy.firstName = "First Name is required";
      valid = false;
    }
    if (lastName.trim()) {
      errorsCopy.lastName = "";
    } else {
      errorsCopy.lastName = "Last Name is required";
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = "";
    } else {
      errorsCopy.email = "Email is required";
      valid = false;
    }

    if (departmentUuid && departmentUuid != "Select Department") {
      errorsCopy.department = "";
    } else {
      errorsCopy.department = "Department is required";
      valid = false;
    }

    setErrors(errorsCopy);

    return valid;
  }

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-mb-6 offset-md-3 ">
          {setPageTitle()}
          <div className="card-body">
            <form action="">
              <div className="form-group mb-2">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstName"
                  value={firstName}
                  className={`form-control ${
                    errors.firstName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errors.firstName && (
                  <div className="invalid-feedback">{errors.firstName}</div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastName"
                  value={lastName}
                  className={`form-control ${
                    errors.lastName ? "is-invalid" : ""
                  }`}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errors.lastName && (
                  <div className="invalid-feedback"> {errors.lastName} </div>
                )}
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                  type="password"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>
              <div className="form-group mb-s">
                <label className="form-label">Select Department</label>
                <select
                  className={`form-control ${
                    errors.department ? "is-invalid" : ""
                  }`}
                  value={departmentUuid}
                  onChange={(e) => {
                    setDepartmentUuid(e.target.value);
                  }}
                >
                  <option value="Select Department">Select Department</option>
                  {departmentsList.map((department) => (
                    <option key={department.uuid} value={department.uuid}>
                      {department.name}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <div className="invalid-feedback">{errors.department}</div>
                )}
              </div>
              <button
                className="btn btn-success"
                onClick={saveOrUpdateEmployee}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeComponent;
