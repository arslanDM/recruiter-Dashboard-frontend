import React, { useState } from "react";
import {
  employerSchema,
  slotSchema,
} from "../../utills/validation/validationSchema";
import { Button, Modal } from "react-bootstrap";
import { Formik, FieldArray } from "formik";

const Employer = () => {
  const [showModal, setShowModal] = useState(false);
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
  const employerData = [
    {
      employerId: 1,
      name: "John doe",
      email: "johndoe@gmail.com",
      jobDescription: "1234567890",
      date: "2023-10-10",
    },
  ];
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
                      jobDescription: isEdit ? selectedData.jobDescription : "",
                      date: isEdit ? selectedData.date : "",
                      timeSlots: [
                        {
                          date: new Date(),
                          startTime: "",
                          endTime: "",
                          timeZone: "",
                        },
                      ],
                    }}
                    validationSchema={employerSchema}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                      console.log(values, 123);
                      //     try {
                      //       const payload = {
                      //         email: values?.email,
                      //         password: values.password,
                      //       };
                      //   const data = await login(payload).unwrap();
                      //   await myProfile(
                      //     data?.responseData?.token,
                      //     data?.responseData?.data?._id
                      //   );
                      //   toast.success("Login successful");
                      //   dispatch(
                      //     setToken({
                      //       token: data?.responseData?.token,
                      //       user: data?.responseData?.data,
                      //     })
                      //   );
                      //   resetForm();
                      //   setSubmitting(false);
                      // } catch (error) {
                      //   setSubmitting(false);
                      //   console.log(error);
                      //   toast.error(error?.data?.message);
                      // }
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
                              Candidate Form
                            </h3>
                            <div className="row">
                              <div className="col-md-6">
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
                                    {errors.email &&
                                      touched.email &&
                                      errors.email}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6">
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
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                <div class="mb-3">
                                  <label
                                    for="formGroupExampleInput2"
                                    class="form-label"
                                  >
                                    Job Description
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="formGroupExampleInput2"
                                    placeholder="Enter job description"
                                    name="jobDescription"
                                    value={values.jobDescription}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <span className="validationError">
                                    {errors.jobDescription &&
                                      touched.jobDescription &&
                                      errors.jobDescription}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div class="mb-3">
                                  <label
                                    for="formGroupExampleInput2"
                                    class="form-label"
                                  >
                                    Date
                                  </label>
                                  <input
                                    type="date"
                                    class="form-control"
                                    id="formGroupExampleInput2"
                                    placeholder="Enter date"
                                    name="date"
                                    value={values.date}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <span className="validationError">
                                    {errors.date && touched.date && errors.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              {console.log(123, values.timeSlots)}
                              <FieldArray name="timeSlots">
                                {({ push, remove }) => (
                                  <div>
                                    {values.timeSlots.map((field, index) => (
                                      <div key={index}>
                                        {console.log(123, index, 999)}
                                        <div className="row mt-2">
                                          <div className="col-md-3 ">
                                            <input
                                              className="form-control"
                                              type="date"
                                              name={`timeSlots[${index}].date`}
                                              value={field.date}
                                              onChange={(e) => {
                                                values.timeSlots[index].date =
                                                  e.target.value;
                                              }}
                                            />
                                            <span className="validationError">
                                              {errors.timeSlots &&
                                                errors.timeSlots[index] &&
                                                errors.timeSlots[index].date &&
                                                touched.timeSlots &&
                                                touched.timeSlots[index].date &&
                                                errors.timeSlots[index].date}
                                            </span>
                                          </div>
                                          <div className="col-md-3">
                                            <input
                                              placeholder="Enter start time"
                                              className="form-control"
                                              type="text"
                                              name={`timeSlots[${index}].startTime`}
                                              value={field.startTime}
                                              onChange={(e) => {
                                                values.timeSlots[
                                                  index
                                                ].startTime = e.target.value;
                                              }}
                                            />
                                            <span className="validationError">
                                              {errors.timeSlots &&
                                                errors.timeSlots[index] &&
                                                errors.timeSlots[index]
                                                  .startTime &&
                                                touched.timeSlots &&
                                                touched.timeSlots[index]
                                                  .startTime &&
                                                errors.timeSlots[index]
                                                  .startTime}
                                            </span>
                                          </div>
                                          <div className="col-md-3">
                                            <input
                                              placeholder="Enter end time"
                                              className="form-control"
                                              type="text"
                                              name={`timeSlots[${index}].endTime`}
                                              value={field.endTime}
                                              onChange={(e) => {
                                                values.timeSlots[
                                                  index
                                                ].endTime = e.target.value;
                                              }}
                                            />
                                            <span className="validationError">
                                              {errors.timeSlots &&
                                                errors.timeSlots[index] &&
                                                errors.timeSlots[index]
                                                  .endTime &&
                                                touched.timeSlots &&
                                                touched.timeSlots[index]
                                                  .endTime &&
                                                errors.timeSlots[index].endTime}
                                            </span>
                                          </div>
                                          <div className="col-md-3">
                                            <input
                                              placeholder="Enter time zone"
                                              className="form-control"
                                              type="text"
                                              name={`timeSlots[${index}].timeZone`}
                                              value={field.timeZone}
                                              onChange={(e) => {
                                                values.timeSlots[
                                                  index
                                                ].timeZone = e.target.value;
                                              }}
                                            />
                                            <span className="validationError">
                                              {errors.timeSlots &&
                                                errors.timeSlots[index] &&
                                                errors.timeSlots[index]
                                                  .timeZone &&
                                                touched.timeSlots &&
                                                touched.timeSlots[index]
                                                  .timeZone &&
                                                errors.timeSlots[index]
                                                  .timeZone}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                    <button
                                      className="btn btn-secondary mt-3"
                                      type="button"
                                      onClick={() =>
                                        push({
                                          date: "",
                                          startTime: "",
                                          endTime: "",
                                          timeZone: "",
                                        })
                                      }
                                    >
                                      Add Slot
                                    </button>
                                  </div>
                                )}
                              </FieldArray>
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
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Job Description</th>

              <th scope="col">Date</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employerData?.map((el, idx) => {
              return (
                <tr>
                  <td>{el?.id}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.jobDescription}</td>
                  <td>{el?.date}</td>

                  <td>
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
                  </td>
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
