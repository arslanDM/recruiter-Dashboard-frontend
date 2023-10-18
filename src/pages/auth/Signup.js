import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "./auth.scss";

const Signup = () => {
  const auth = useSelector((state) => state.auth.isAuthentication);
  const navigate = useNavigate();
  useEffect(() => {
    if (auth == true) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <section className="auth">
        <div className="container py-5 py-sm-4">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5 p-4 p-sm-4">
              <div className="card p-3 p-sm-4">
                <div className="card-body">
                  <div className="text-capitalize">
                    <h3 className="mb-4 mb-sm-5 text-center">Sign Up</h3>
                    <div class="mb-3">
                      <label for="formGroupExampleInput" class="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        class="form-control"
                        id="formGroupExampleInput"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="formGroupExampleInput2" class="form-label">
                        password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="formGroupExampleInput2"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="formGroupExampleInput2" class="form-label">
                        Confirm password
                      </label>
                      <input
                        type="password"
                        class="form-control"
                        id="formGroupExampleInput2"
                      />
                    </div>
                    <div class="mb-3">
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
                    </div>

                    <button className="btn btn-primary w-100" type="submit">
                      Signup
                    </button>
                  </div>

                  <hr className="my-4" />
                  <p className="text-center">
                    Have an account?
                    <Link onClick={() => navigate("/signup")}>
                      <span className="ms-1">Signin</span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
