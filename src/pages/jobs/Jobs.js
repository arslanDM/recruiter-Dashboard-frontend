import React, { useState } from "react";
import { jobsSchema } from "../../utills/validation/validationSchema";
import { Button, FormSelect, Modal } from "react-bootstrap";
import { FieldArray, Formik } from "formik";
import {
  useGetAllEmployersQuery,
  useGetAllJobsQuery,
} from "../../redux/api/user.api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Jobs = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: employers } = useGetAllEmployersQuery(token);
  const { data, refetch } = useGetAllJobsQuery(token);

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [slots, setSlots] = useState([]);

  const handleClose = () => {
    setShowModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };
  console.log(employers, 123);
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
            <Modal.Title>Add Job Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-12 col-lg-12 col-xl-12 p-4 p-sm-4">
                <div className="card p-3 p-sm-4 w-100">
                  <Formik
                    initialValues={{
                      jobDescription: "",
                      employer: "",
                      dates: [
                        { date: "", startTime: "", endTime: "", timeZone: "" },
                      ],
                    }}
                    validationSchema={jobsSchema}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                      console.log(values, 123);
                      try {
                        const payload = { body: values, token: token };
                        // const data = await createEmployer(payload).unwrap();

                        toast.success("Job added successfully");

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
                              Job Form
                            </h3>
                            <div className="row">
                              <div className="col-md-6">
                                <div class="mb-3">
                                  <label
                                    for="formGroupExampleInput"
                                    className="form-label"
                                  >
                                    Employer
                                  </label>
                                  <FormSelect
                                    value={values.id}
                                    className="form-control"
                                    name="employer"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                  >
                                    <option value="">Select employer</option>
                                    {employers?.responseData?.map((el, idx) => {
                                      return (
                                        <option
                                          className="form-control"
                                          value={el._id}
                                          key={idx}
                                        >
                                          {el.name}
                                        </option>
                                      );
                                    })}
                                  </FormSelect>
                                  <span className="validationError">
                                    {errors.employer &&
                                      touched.employer &&
                                      errors.employer}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div class="mb-3">
                              <label
                                for="formGroupExampleInput2"
                                className="form-label"
                              >
                                Job Description
                              </label>
                              <textarea
                                rows={10}
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

                            <div className="mb-3">
                              <label
                                for="formGroupExampleInput"
                                className="form-label"
                              >
                                Slots
                              </label>
                              {
                                <FieldArray
                                  name="dates"
                                  render={(arrayHelpers) => (
                                    <div>
                                      {values.dates.map((el, index) => (
                                        <div key={index}>
                                          <div className="row mb-2">
                                            <div className="col-md-3">
                                              <label
                                                for="formGroupExampleInput"
                                                className="form-label"
                                              >
                                                Date
                                              </label>
                                              <input
                                                className="form-control"
                                                name={`dates[${index}].date`}
                                                type="date"
                                                value={el.date}
                                                onChange={(e) => {
                                                  arrayHelpers.form.setFieldValue(
                                                    `dates[${index}].date`,
                                                    e.target.value
                                                  );
                                                  console.log(e.target.value);
                                                }}
                                              />
                                              <span className="validationError">
                                                {errors.date &&
                                                  touched.date &&
                                                  errors.date}
                                              </span>
                                            </div>
                                            <div className="col-md-3">
                                              <label
                                                for="formGroupExampleInput"
                                                className="form-label"
                                              >
                                                Start Time
                                              </label>
                                              <input
                                                className="form-control"
                                                name={`dates[${index}].startTime`}
                                                type="text"
                                                placeholder="Enter start time"
                                                value={el.startTime}
                                                onChange={(e) => {
                                                  arrayHelpers.form.setFieldValue(
                                                    `dates[${index}].startTime`,
                                                    e.target.value
                                                  );
                                                  console.log(e.target.value);
                                                }}
                                              />
                                              <span className="validationError">
                                                {errors.startTime &&
                                                  touched.startTime &&
                                                  errors.startTime}
                                              </span>
                                            </div>
                                            <div className="col-md-3">
                                              <label
                                                for="formGroupExampleInput"
                                                className="form-label"
                                              >
                                                End Time
                                              </label>
                                              <input
                                                className="form-control"
                                                name={`dates[${index}].endTime`}
                                                type="text"
                                                placeholder="Enter end time"
                                                value={el.endtime}
                                                onChange={(e) => {
                                                  arrayHelpers.form.setFieldValue(
                                                    `dates[${index}].endTime`,
                                                    e.target.value
                                                  );
                                                  console.log(e.target.value);
                                                }}
                                              />
                                              <span className="validationError">
                                                {errors.endTime &&
                                                  touched.endTime &&
                                                  errors.endTime}
                                              </span>
                                            </div>
                                            <div className="col-md-3">
                                              <label
                                                for="formGroupExampleInput"
                                                className="form-label"
                                              >
                                                Time zone
                                              </label>
                                              <input
                                                className="form-control"
                                                name={`dates[${index}].timeZone`}
                                                type="text"
                                                placeholder="Enter time zone"
                                                value={el.timeZone}
                                                onChange={(e) => {
                                                  arrayHelpers.form.setFieldValue(
                                                    `dates[${index}].timeZone`,
                                                    e.target.value
                                                  );
                                                  console.log(e.target.value);
                                                }}
                                              />
                                              <span className="validationError">
                                                {errors.timeZone &&
                                                  touched.timeZone &&
                                                  errors.timeZone}
                                              </span>
                                            </div>
                                          </div>
                                          <hr className="hr" />
                                        </div>
                                      ))}
                                      <button
                                        className="btn btn-secondary mt-2"
                                        type="button"
                                        onClick={() =>
                                          arrayHelpers.push({ date: "" })
                                        }
                                      >
                                        Add Date
                                      </button>
                                    </div>
                                  )}
                                />
                              }
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
                                Add Job
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
          Add Job
        </Button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Job Description</th>

              <th scope="col">Date</th>
              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {/* {employerData?.map((el, idx) => {
              return (
                <tr>
                  <td>{el?.id}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.jobDescription}</td>
                  <td>{el?.date}</td>
                </tr>
              );
            })} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Jobs;
