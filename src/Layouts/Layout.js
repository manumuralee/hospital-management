import React from "react";
import HospitalNavbar from "./HospitalNavbar";


const Layout = props => {
  return (
    <>
      <HospitalNavbar />
      <main>{props.children}</main>
    </>
  );
};
export default Layout;