import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../redux/slicer/auth.slicer";
import { useDispatch } from "react-redux";

const AppSidebar = () => {
  const [path, setPath] = useState(window?.location?.pathname);

  const checkPath = (newPath) => {
    const url = window?.location.pathname;
    if (url?.includes(newPath)) {
      return true;
    } else {
      return false;
    }
  };
  const dipatch = useDispatch();
  const logoutUser = () => {
    dipatch(logout());
  };
  return (
    <div className="sidebar">
      <nav className="bg-light">
        <div className="p-4">
          <h4 className="d-flex justify-content-center align-items-center">
            Dashboard
          </h4>
          <ul className="list-unstyled components ">
            <li className="p-2">
              <Link
                className={`btn w-100 ${
                  checkPath("staff") ? "btn-primary" : ""
                }`}
                to="/staff"
                onClick={() => {
                  setPath("staff");
                }}
              >
                Staff
              </Link>
            </li>
            <li className=" p-2">
              <Link
                className={`btn w-100 ${
                  checkPath("candidates") ? "btn-primary" : ""
                }`}
                to="/candidates"
                onClick={() => {
                  setPath("candidates");
                }}
              >
                Candidates
              </Link>
            </li>

            <li className=" p-2">
              <Link
                className={`btn w-100 ${
                  checkPath("employer") ? "btn-primary" : ""
                }`}
                to="/employer"
                onClick={() => {
                  setPath("employer");
                }}
              >
                Employer
              </Link>
            </li>
            <li>
              <Link
                className={`btn w-100 ${
                  checkPath("logout") ? "btn-primary" : ""
                }`}
                to="/login"
                onClick={() => {
                  logoutUser();
                }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default AppSidebar;
