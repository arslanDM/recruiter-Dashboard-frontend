import React, { Suspense, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser, logout } from "./redux/slicer/auth.slicer";
import PrivateRoute from "./utills/privateRoute/PrivateRoute";
import { useLazyLoadUserQuery, useLoadUserQuery } from "./redux/api/user.api";
import routes, { authRoutes } from "./routes";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const [loadUser] = useLazyLoadUserQuery();

  // console.log(123, token, 888);

  const loadData = async () => {
    try {
      await loadUser({ token }).unwrap();
    } catch (error) {
      console.log(error);
      dispatch(logout());
    }
  };
  useEffect(() => {
    loadData(token);
  }, []);

  const loading = useSelector((state) => state.auth.authLoading);
  // const loading = false;

  return (
    <div>
      <ToastContainer />
      {loading ? (
        <div>loading......</div>
      ) : (
        <Router>
          <Suspense fallback={<p>Loading.....</p>}>
            <Routes>
              {authRoutes.map((route, idx) => {
                return (
                  <Route
                    key={idx}
                    path={route.path}
                    element={route.element}
                    exact={route.exact}
                  />
                );
              })}

              <Route element={<PrivateRoute />}>
                {routes.map((route, idx) => {
                  return (
                    <Route
                      key={idx}
                      path={route.path}
                      element={route.element}
                      exact={route.exact}
                    />
                  );
                })}
              </Route>
            </Routes>
          </Suspense>
        </Router>
      )}
    </div>
  );
};

export default App;
