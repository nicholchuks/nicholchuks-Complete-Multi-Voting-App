import React from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default RootLayout;
// This component serves as the root layout for the application. It includes a Navbar component and an Outlet component from react-router-dom, which will render the child routes defined in the router configuration. The Outlet component acts as a placeholder for the nested routes, allowing for a clean and organized structure in the application. The RootLayout component is typically used to wrap around the main content of the application, providing a consistent layout across different pages.
