import React from "react";
import { useSelector } from "react-redux";

const AppHeader = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <div className="top-bar">
      <h2 className="text-primary p-3">
        Welcome {user.role === "admin" ? "Admin" : "Staff"}
      </h2>
    </div>
  );
};

export default AppHeader;
