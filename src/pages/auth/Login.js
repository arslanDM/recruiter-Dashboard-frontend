import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/auth.api";
import { setToken, setProfile } from "../../redux/slicer/auth.slicer";
import "./auth.scss";
import { Formik } from "formik";
import { loginSchema } from "../../utills/validation/validationSchema";
import { toast } from "react-toastify";
import { useLazyLoadUserQuery } from "../../redux/api/user.api";
const Login = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.isAuthentication);

  const [loadUser] = useLazyLoadUserQuery();

  const navigate = useNavigate();
  useEffect(() => {
    if (auth == true) {
      navigate("/");
    }
  }, [auth]);

  const myProfile = async (token, id) => {
    try {
      const data = await loadUser({ token: token });
      dispatch(setProfile(data?.data?.responseData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <section className="auth">
        <div className="container py-5 py-sm-4">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 p-4 p-sm-4">
              <div className="card p-3 p-sm-4">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validationSchema={loginSchema}
                  onSubmit={async (values, { resetForm, setSubmitting }) => {
                    console.log(values);
                    try {
                      const payload = {
                        email: values?.email,
                        password: values.password,
                      };
                      const data = await login(payload).unwrap();
                      await myProfile(
                        data?.responseData?.token,
                        data?.responseData?.data?._id
                      );
                      toast.success("Login successful");
                      dispatch(
                        setToken({
                          token: data?.responseData?.token,
                          user: data?.responseData?.data,
                        })
                      );
                      resetForm();
                      setSubmitting(false);
                    } catch (error) {
                      setSubmitting(false);
                      console.log(error);
                      toast.error(error?.data?.message);
                    }
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <div className="card-body">
                      <form onSubmit={handleSubmit}>
                        <div className="text-capitalize">
                          <h3 className="mb-4 mb-sm-5 text-center">Login</h3>
                          <div className="mb-3">
                            <label
                              for="formGroupExampleInput"
                              className="form-label"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              id="formGroupExampleInput"
                              placeholder="Enter email"
                              name="email"
                              value={values.email}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <span className="authError">
                              {errors.email && touched.email && errors.email}
                            </span>
                          </div>
                          <div className="mb-3">
                            <label
                              for="formGroupExampleInput2"
                              className="form-label"
                            >
                              password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              id="formGroupExampleInput2"
                              placeholder="Enter password"
                              name="password"
                              value={values.password}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <span className="authError">
                              {errors.password &&
                                touched.password &&
                                errors.password}
                            </span>
                          </div>
                          {/* <div className="mb-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="gridCheck"
                        />
                        <label className="form-check-label" for="gridCheck">
                          Remember Me
                        </label>
                      </div>
                    </div> */}

                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                          >
                            Login
                          </button>
                        </div>

                        {/* <hr className="my-4" /> */}
                        {/* <p className="text-center">
                    Don’t have an account?
                    <Link onClick={() => navigate("/signup")}>
                      <span className="ms-1">Signup</span>
                    </Link>
                  </p> */}
                      </form>
                    </div>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
