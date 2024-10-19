import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HelloWorld from "./HelloWorld";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmployeeComponent from "./components/EmployeeComponent";
import ListDepartmentComponent from "./components/ListDepartmentComponent";
import DepartmentComponent from "./components/DepartmentComponent";

function App() {
  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* http://localhost:5000 */}
          <Route path="/" element={<ListEmployeeComponent />}></Route>
          {/* http://localhost:5000/employees */}
          <Route path="/employees" element={<ListEmployeeComponent />}></Route>
          {/* http://localhost:5000/add-employee */}
          <Route path="/add-employee" element={<EmployeeComponent />}></Route>
          {/* http://localhost:5000/edit-employee/:uuid */}
          <Route
            path="/edit-employee/:uuid"
            element={<EmployeeComponent />}
          ></Route>
          {/* http://localhost:5000/departments */}
          <Route
            path="/departments"
            element={<ListDepartmentComponent />}
          ></Route>
          {/* http://localhost:5000/add-department */}
          <Route
            path="/add-department"
            element={<DepartmentComponent />}
          ></Route>
          {/* http://localhost:5000/edit-department/:uuid */}
          <Route
            path="/edit-department/:uuid"
            element={<DepartmentComponent />}
          ></Route>
        </Routes>
        <FooterComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
