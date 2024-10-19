import React, { useState, useEffect } from "react";
import {
  createDepartment,
  getDepartmentByUuid,
  updateDepartmentByUuid,
} from "../services/DepartmentService";
import { useNavigate, useParams } from "react-router-dom";

const DepartmentComponent = () => {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");

  const { uuid } = useParams();

  useEffect(() => {
    if (uuid) {
      getDepartmentByUuid(uuid)
        .then((response) => {
          setDepartmentName(response.data.name);
          setDepartmentDescription(response.data.description);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [uuid]);

  const navigator = useNavigate();
  function saveOrUpdateDepartment(e) {
    e.preventDefault();
    const department = {
      name: departmentName,
      description: departmentDescription,
    };
    console.log(department);

    if (uuid) {
      updateDepartmentByUuid(uuid, department)
        .then((response) => {
          console.log(response.data);
          navigator("/departments");
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (!uuid) {
      createDepartment(department)
        .then((response) => {
          console.log(response.data);
          navigator("/departments");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function setPageTitle() {
    if (uuid) {
      return <h2 className="text-center">Update Department</h2>;
    } else {
      return <h2 className="text-center">Add Department</h2>;
    }
  }

  return (
    <div className="container">
      <br />
      <br />
      <div className="row">
        <div className="card col-mb-6 offset-md-3 offset-md-3">
          {setPageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Department Name:</label>
                <input
                  type="text"
                  name="departmentName"
                  placeholder="Enter Department Name"
                  value={departmentName}
                  onChange={(e) => {
                    setDepartmentName(e.target.value);
                  }}
                  className="form-control"
                />
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Department Description:</label>
                <input
                  type="text"
                  name="departmentDescription"
                  placeholder="Enter Department Description"
                  value={departmentDescription}
                  onChange={(e) => {
                    setDepartmentDescription(e.target.value);
                  }}
                  className="form-control"
                />
              </div>
              <button
                className="btn btn-success mb-2"
                onClick={(e) => {
                  saveOrUpdateDepartment(e);
                }}
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

export default DepartmentComponent;
