import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HelloWorld from "./HelloWorld";
import ListEmployeeComponent from "./components/ListEmployeeComponent";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";

function App() {
  return (
    <>
      <HeaderComponent />
      <HelloWorld />
      <ListEmployeeComponent />
      <FooterComponent />
    </>
  );
}

export default App;
