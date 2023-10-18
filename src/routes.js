import React from "react";
import Staff from "./pages/Staff";
import Employer from "./pages/Employer/index";
import Candidates from "./pages/Candidates";

const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const Signup = React.lazy(() => import("./pages/auth/Signup"));
const Page404 = React.lazy(() => import("./pages/Page404"));

const routes = [
  { path: "/", name: "Dashboard", element: <Dashboard />, exact: true },
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   element: <Dashboard />,
  //   exact: true,
  // },
  {
    path: "/staff",
    name: "Staff",
    element: <Staff />,
    exact: true,
  },
  {
    path: "/employer",
    name: "Employer",
    element: <Employer />,
    exact: true,
  },
  {
    path: "/candidates",
    name: "Candidates",
    element: <Candidates />,
    exact: true,
  },
  { path: "*", name: "Page404", element: <Page404 /> },
];

export const authRoutes = [
  { path: "/login", name: "Login", element: <Login />, exact: true },
  // { path: "/signup", name: "Signup", element: <Signup />, exact: true },
  { path: "*", name: "Page404", element: <Page404 /> },
];

export default routes;
