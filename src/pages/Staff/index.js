import { Formik } from "formik";
import React, { useState } from "react";
import { staffSchema } from "../../utills/validation/validationSchema";
import { Button, Modal } from "react-bootstrap";
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
import {
  useCreateStaffMutation,
  useGetAllUsersQuery,
} from "../../redux/api/user.api";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Staff = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [createStaff, { isLoading: isCreating }] = useCreateStaffMutation();
  const user = useSelector((user) => user.auth);
  const { data, isLoading, refetch } = useGetAllUsersQuery({
    userToken: user.token,
  });
  const [selectedData, setSelectedData] = useState({
    email: "",
    role: "",
    password: "",
    jobDescription: "",
  });

  const staffData = [
    {
      id: 1,
      name: "John doe",
      email: "johndoe@gmail.com",
      role: "staff",
      password: "1234567890",
    },
  ];
  const handleClose = () => {
    setShowModal(false);
    setIsEdit(false);
    setSelectedData({
      email: "",
      role: "recruiter",
      password: "",
    });
  };
  const handleShow = () => {
    setShowModal(true);
  };

  const handleDelete = (id) => {
    console.log(id);
  };
  return (
    <div>
      <div className="container py-5 py-sm-4">
        <Modal
          show={showModal}
          onHide={handleClose}
          className="w-100"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Staff Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-12 col-lg-12 col-xl-12 p-4 p-sm-4">
                <div className="card p-3 p-sm-4 w-100">
                  <Formik
                    initialValues={{
                      email: isEdit ? selectedData.email : "",
                      // name: selectedData?.name ? selectedData.name : "",
                      jobDescription: isEdit ? selectedData.jobDescription : "",
                      password: isEdit ? selectedData.password : "",
                      role: "recruiter",
                    }}
                    validationSchema={staffSchema}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                      try {
                        const result = await createStaff({
                          state: {
                            userToken: user.token,
                          },
                          body: values,
                        }).unwrap();

                        toast.success("Recruiter created successfully");
                        refetch();
                        setShowModal(false);
                        if (result?.error) {
                          toast.error(result?.error?.data?.error?.msg);
                        }
                      } catch (error) {
                        toast.error(
                          "Unable to create Recruiter, please try again!"
                        );
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
                            <h3 className="mb-4 mb-sm-5 text-center">
                              Staff Form
                            </h3>
                            <div class="mb-3">
                              <label
                                for="formGroupExampleInput"
                                class="form-label"
                              >
                                Email
                              </label>
                              <input
                                type="email"
                                class="form-control"
                                id="formGroupExampleInput"
                                placeholder="Enter email"
                                name="email"
                                value={values.email}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <span className="validationError">
                                {errors.email && touched.email && errors.email}
                              </span>
                            </div>
                            {/* <div class="mb-3">
                              <label
                                for="formGroupExampleInput2"
                                class="form-label"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="formGroupExampleInput2"
                                placeholder="Enter name"
                                name="name"
                                value={values.name}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <span className="validationError">
                                {errors.name && touched.name && errors.name}
                              </span>
                            </div> */}
                            <div class="mb-3 ">
                              <label
                                for="formGroupExampleInput2"
                                class="form-label"
                              >
                                Password
                              </label>
                              <div className="position-relative">
                                <input
                                  type={showPass ? "text" : "password"}
                                  class="form-control form-icon-trailing"
                                  id="formGroupExampleInput2"
                                  placeholder="Enter password"
                                  name="password"
                                  value={values.password}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                />
                                <div
                                  class="input-group-addon position-absolute top-0 end-0 mt-2 me-2 text-dark"
                                  onClick={() => setShowPass(!showPass)}
                                >
                                  {showPass ? (
                                    <BsFillEyeSlashFill />
                                  ) : (
                                    <BsFillEyeFill />
                                  )}
                                  <i
                                    class="fa fa-eye-slash"
                                    aria-hidden="true"
                                  ></i>
                                </div>
                              </div>
                              <span className="validationError">
                                {errors.password &&
                                  touched.password &&
                                  errors.password}
                              </span>
                            </div>

                            <div className="d-flex justify-content-end gap-3">
                              <button
                                className="btn btn-danger"
                                onClick={handleClose}
                              >
                                Cancel
                              </button>
                              <button
                                className="btn btn-primary "
                                type="submit"
                              >
                                {isEdit ? "Update Staff" : "Add Staff"}
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Button variant="primary" onClick={handleShow}>
          Add Staff
        </Button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              {/* <th scope="col">Name</th> */}
              <th scope="col">Email</th>

              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.responseData?.map((el, idx) => {
              return (
                <tr>
                  <td>{idx + 1}</td>
                  {/* <td>{el?.name}</td> */}
                  <td>{el?.email}</td>

                  {/* <td>
                    <div className="d-flex gap-2">
                      <div>
                        <button
                          className="btn btn-secondary"
                          onClick={() => {
                            setShowModal(true);
                            setIsEdit(true);
                            setSelectedData(el);
                          }}
                        >
                          Edit
                        </button>
                      </div>
                      <div>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleDelete(el.employerId);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Staff;
