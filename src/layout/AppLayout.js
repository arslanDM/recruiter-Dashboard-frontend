import React from "react";
import AppHeader from "./AppHeader";
import AppSiderbar from "./AppSidebar";
import "./layout.scss";

const AppLayout = ({ children }) => {
  return (
    <div className="layout">
      <AppSiderbar />
      <div className="right-side-dashboard">
        <AppHeader />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default AppLayout;
