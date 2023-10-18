import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AppLayout from "../../layout/AppLayout";
import { Suspense } from "react";

const PrivateRoutes = () => {
  const auth = useSelector((state) => state.auth.isAuthentication);
  return auth ? (
    <AppLayout>
      <Suspense fallback={<p>Loading......</p>}>
        <Outlet />
      </Suspense>
    </AppLayout>
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
