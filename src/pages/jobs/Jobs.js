import React, { useState } from "react";
import {
  interviewSchema,
  jobsSchema,
} from "../../utills/validation/validationSchema";
import { Button, FormSelect, Modal } from "react-bootstrap";
import { FieldArray, Formik } from "formik";
import {
  useGetAllEmployersQuery,
  useGetAllJobsQuery,
  useCreateJobMutation,
  useGetAllCandidatesQuery,
  useCreateInterviewMutation,
} from "../../redux/api/user.api";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const Jobs = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: employers } = useGetAllEmployersQuery(token);
  const { data: candidates } = useGetAllCandidatesQuery(token);
  const { data: getJobs, refetch } = useGetAllJobsQuery(token);
  const [createJob, { isLoading: isCreating }] = useCreateJobMutation();
  const [createInterview] = useCreateInterviewMutation();

  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [slots, setSlots] = useState([]);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState({
    name: "",
    jobDescription: "",
    date: "",
    employerId: "",
    slots: [],
  });
  const handleClose = () => {
    setShowModal(false);
    setShowViewModal(false);
  };
  const handleShow = () => {
    setShowModal(true);
  };
  const combinedData = (values) => {
    const combinedDates = values.reduce((result, date) => {
      const existingDate = result.find((d) => d.date === date.date);

      if (existingDate) {
        existingDate.timeSlots.push({
          startTime: date.startTime,
          endTime: date.endTime,
          timeZone: date.timezone,
          status: date.status,
        });
      } else {
        result.push({
          date: date.date,
          timeSlots: [
            {
              startTime: date.startTime,
              endTime: date.endTime,
              timeZone: date.timeZone,
              status: date.status,
            },
          ],
        });
      }

      return result;
    }, []);

    return combinedDates;
  };
  const ViewJobModal = () => {
    return (
      <div>
        <Modal
          show={showViewModal}
          onHide={handleClose}
          className="w-100"
          size="lg"
        >
          <Modal.Header closeButton>
            <Modal.Title>Job</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Formik
              initialValues={{
                jobDescription: selectedJob?.jobDescription,
                employerId: selectedJob?.employerId?._id,
                date: "",
                selectedSlot: "",
                candidateId: "",
                interviewLink: "",
              }}
              validationSchema={interviewSchema}
              onSubmit={async (values, { resetForm, setSubmitting }) => {
                try {
                  // const data = await createJob(payload).unwrap();

                  const date1 = selectedJob?.dates?.find(
                    (el) => el._id == values.date
                  );
                  const slot1 = date1?.timeSlots?.find(
                    (el) => el._id == values.selectedSlot
                  );
                  const feedbackSlot = {
                    date: date1.date,
                    startTime: slot1.startTime,
                    endTime: slot1.endTime,
                    timeZone: slot1.timeZone,
                  };
                  const payload = {
                    body: {
                      ...values,
                      jobId: selectedJob._id,
                      feedbackSlot: feedbackSlot,
                    },
                    token: token,
                  };

                  console.log(payload, 123);
                  await createInterview(payload);
                  toast.success("Job added successfully");
                  refetch();
                  resetForm();
                  setShowViewModal(false);
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
                      {/* <h3 className="mb-4 mb-sm-5 text-center">Job</h3> */}
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              for="formGroupExampleInput"
                              className="form-label"
                            >
                              Employer
                            </label>
                            <FormSelect
                              defaultValue={values.employerId}
                              className="form-control"
                              name="employerId"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={true}
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
                              {errors.employerId &&
                                touched.employerId &&
                                errors.employerId}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div class="mb-3">
                          <label
                            for="formGroupExampleInput"
                            className="form-label"
                          >
                            Candidates
                          </label>
                          <FormSelect
                            defaultValue={values.candidate}
                            className="form-control"
                            name="candidateId"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">Select Candidates</option>
                            {candidates?.responseData?.map((el, idx) => {
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
                            {errors.candidateId &&
                              touched.candidateId &&
                              errors.candidateId}
                          </span>
                        </div>
                      </div>
                      <div class="mb-3">
                        <label
                          for="formGroupExampleInput2"
                          className="form-label"
                        >
                          Interview Link
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="formGroupExampleInput2"
                          placeholder="Enter interview link"
                          name="interviewLink"
                          value={values.interviewLink}
                          onBlur={handleBlur}
                          onChange={handleChange}
                        />
                        <span className="validationError">
                          {errors.interviewLink &&
                            touched.interviewLink &&
                            errors.interviewLink}
                        </span>
                      </div>
                      <div class="mb-3">
                        <label
                          for="formGroupExampleInput2"
                          className="form-label"
                        >
                          Job Description
                        </label>
                        <textarea
                          disabled={true}
                          rows={10}
                          type="text"
                          className="form-control"
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
                      <div className="row">
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label
                              for="formGroupExampleInput"
                              className="form-label"
                            >
                              Dates
                            </label>
                            <FormSelect
                              className="form-control"
                              name="date"
                              value={values.date}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="">Select Date</option>
                              {selectedJob?.dates.map((sSlot, idx) => {
                                return (
                                  <option key={idx} value={sSlot._id}>
                                    {sSlot.date}
                                  </option>
                                );
                              })}
                            </FormSelect>
                            <span className="validationError">
                              {errors.date && touched.date && errors.date}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6">
                          {values?.date && (
                            <div className="mb-3">
                              <label
                                for="formGroupExampleInput2"
                                className="form-label"
                              >
                                Time Slot
                              </label>
                              <FormSelect
                                name="selectedSlot"
                                className="form-control"
                                value={values.selectedSlot}
                                onChange={handleChange}
                                onBlur={handleBlur}
                              >
                                <option value="">Select Time Slot</option>
                                {selectedJob?.dates
                                  .filter((el) => el._id == values.date)?.[0]
                                  .timeSlots?.map?.((el, idx) => {
                                    return (
                                      <option
                                        key={idx}
                                        value={el._id}
                                        disabled={
                                          el.status == "booked" ? true : false
                                        }
                                      >
                                        {el.startTime}-{el.endTime}{" "}
                                        {el.status == "booked"
                                          ? "Booked"
                                          : "Available"}
                                      </option>
                                    );
                                  })}
                              </FormSelect>
                            </div>
                          )}
                          {values.date && (
                            <span className="validationError">
                              {errors.selectedSlot &&
                                touched.selectedSlot &&
                                errors.selectedSlot}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="d-flex justify-content-end gap-3">
                        <button
                          className="btn btn-danger"
                          onClick={handleClose}
                        >
                          Cancel
                        </button>
                        <button className="btn btn-primary " type="submit">
                          Create Interview
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </Formik>
          </Modal.Body>
        </Modal>
      </div>
    );
  };

  return (
    <div>
      <div className="container py-5 py-sm-4">
        <ViewJobModal />

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
                        {
                          date: "",
                          startTime: "",
                          endTime: "",
                          timeZone: "",
                          status: "available",
                        },
                      ],
                    }}
                    validationSchema={jobsSchema}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                      let val = combinedData(values.dates);
                      const jobData = {
                        jobDescription: values.jobDescription,
                        employerId: values.employer,
                        dates: val,
                      };
                      try {
                        const payload = { body: jobData, token: token };

                        const data = await createJob(payload).unwrap();

                        toast.success("Job added successfully");
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

              <th scope="col">Job Description</th>

              {/* <th scope="col">Date</th>
              <th scope="col">Time Slot</th> */}
              <th scope="col">Action</th>

              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {getJobs?.responseData?.map((el, idx) => {
              return (
                <tr>
                  <td>{idx + 1}</td>
                  <td>{el?.employerId?.name}</td>

                  <td>{el?.jobDescription}</td>
                  {/* <td>
                    {el?.dates && el.dates[0]
                      ? new Date(el.dates[0].date).toLocaleDateString()
                      : ""}
                  </td>
                  <td>
                    <FormSelect>
                      {el?.dates[0]?.timeSlots?.map((slot, slotIdx) => (
                        <option key={slotIdx} value={slot.startTime}>
                          {`${slot.startTime} - ${slot.endTime}`}
                        </option>
                      ))}
                    </FormSelect>
                  </td> */}
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setShowViewModal(true);
                        setSelectedJob(el);
                      }}
                    >
                      View Job
                    </button>
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

export default Jobs;
