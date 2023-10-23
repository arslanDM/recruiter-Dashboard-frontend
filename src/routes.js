import React from "react";
import Staff from "./pages/Staff";
import Employer from "./pages/Employer/index";
import Candidates from "./pages/Candidates";
import Jobs from "./pages/jobs/Jobs";
import Interviews from "./pages/interviews/Interviews";
import Feedback from "./pages/feedback/Feedback";
import InterviewDetails from "./pages/interviews/InterviewDetails";
import FeedbackDetails from "./pages/feedback/FeedbackDetails";

const Dashboard = React.lazy(() => import("./pages/dashboard/Dashboard"));
const Login = React.lazy(() => import("./pages/auth/Login"));
const StatusTracking = React.lazy(() =>
  import("./pages/StatusTacking/StatusTracking")
);
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
  {
    path: "/jobs",
    name: "Jobs",
    element: <Jobs />,
    exact: true,
  },
  {
    path: "/interviews",
    name: "Interviews",
    element: <Interviews />,
    exact: true,
  },
  {
    path: "/interviews/:id",
    name: "Interviews Details",
    element: <InterviewDetails />,
    exact: true,
  },
  {
    path: "/feedback",
    name: "Feedback",
    element: <Feedback />,
    exact: true,
  },
  {
    path: "/feedback-details/:id",
    name: "Feedback Details",
    element: <FeedbackDetails />,
    exact: true,
  },
  { path: "*", name: "Page404", element: <Page404 /> },
];

export const authRoutes = [
  { path: "/login", name: "Login", element: <Login />, exact: true },
  {
    path: "/status-tracking/:id",
    name: "Status Tracking",
    element: <StatusTracking />,
    exact: true,
  },
  { path: "*", name: "Page404", element: <Page404 /> },
];

export default routes;
