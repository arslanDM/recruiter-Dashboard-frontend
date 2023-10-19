import React, { useState } from "react";
import {
  employerSchema,
  slotSchema,
} from "../../utills/validation/validationSchema";
import { Button, Modal } from "react-bootstrap";
import { Formik, FieldArray } from "formik";
import {
  useCreateEmployerMutation,
  useGetAllEmployersQuery,
} from "../../redux/api/user.api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Employer = () => {
  const token = useSelector((state) => state.auth.token);
  const { data, refetch } = useGetAllEmployersQuery(token);
  const [showModal, setShowModal] = useState(false);
  const [createEmployer] = useCreateEmployerMutation();
  const [isEdit, setIsEdit] = useState(false);
  const [slots, setSlots] = useState([]);
  const [selectedData, setSelectedData] = useState({
    employerId: "",
    email: "",
    name: "",
    date: "",
    jobDescription: "",
    timeSlot: { startTime: "", endTime: "", status: "", timezone: "" },
  });

  const handleClose = () => {
    setShowModal(false);
    setIsEdit(false);
    setSelectedData({
      employerId: "",
      email: "",
      name: "",
      date: "",
      jobDescription: "",
      timeSlot: { startTime: "", endTime: "", status: "", timeZone: "" },
    });
  };
  const handleShow = () => {
    setShowModal(true);
  };

  const handleDelete = (id) => {};

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
            <Modal.Title>Add Employer Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-12 col-lg-12 col-xl-12 p-4 p-sm-4">
                <div className="card p-3 p-sm-4 w-100">
                  <Formik
                    initialValues={{
                      email: isEdit ? selectedData.email : "",
                      name: selectedData?.name ? selectedData.name : "",
                    }}
                    validationSchema={employerSchema}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                      console.log(values, 123);
                      try {
                        const payload = { body: values, token: token };
                        const data = await createEmployer(payload).unwrap();

                        toast.success("Employer added successfully");
                        refetch();
                        resetForm();
                        setShowModal(false);
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
                            <h3 className="mb-4 mb-sm-5 text-center">
                              Employer Form
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
                            <div class="mb-3">
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
                                Add Employer
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
          Add Employer
        </Button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>

              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.responseData?.map((el, idx) => {
              return (
                <tr key={idx}>
                  <td>{el?.name}</td>
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

export default Employer;
