import React, { useState } from "react";
import { FormSelect, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Formik } from "formik";
import {
  interviewModalSchema,
  interviewSchema,
} from "../../utills/validation/validationSchema";
import {
  useGetJobByIdQuery,
  useGetAllCandidatesQuery,
  useCreateInterviewMutation,
} from "../../redux/api/user.api";

const JobDetail = () => {
  const { id } = useParams();
  const token = useSelector((state) => state?.auth.token);
  const { data } = useGetJobByIdQuery({ token: token, id: id });
  const { data: candidates } = useGetAllCandidatesQuery(token);
  const [createInterview] = useCreateInterviewMutation();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  console.log(data, 123);

  return (
    <div className="container py-5">
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        className="w-100"
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Candidate Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            initialValues={{
              candidateId: "",
              date: "",
              selectedSlot: "",
              interviewLink: "",
              employerId: data?.responseData?.employerId?._id,
            }}
            validationSchema={interviewSchema}
            onSubmit={async (values, { setSubmitting }) => {
              console.log(values);
              const date1 = data?.responseData?.dates?.find(
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
              try {
                const payload = {
                  body: { ...values, jobId: id, feedbackSlot: feedbackSlot },
                  token: token,
                };
                await createInterview(payload).unwrap();
                handleCloseModal();
                setSubmitting(false);
              } catch (error) {
                console.log(error);
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
              <form onSubmit={handleSubmit}>
                <div className="mb-3  w-100 d-flex justify-content-center align-items-center">
                  <h5 className="form-label">Schedule Interview</h5>
                </div>
                <div className="mb-3">
                  <label className="form-label">Candidate</label>
                  <FormSelect
                    className="form-control"
                    value={values.candidateId}
                    name="candidateId"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select candidate</option>
                    {candidates?.responseData?.map((el, idx) => (
                      <option key={idx} value={el._id}>
                        {el.name}
                      </option>
                    ))}
                  </FormSelect>
                  <span className="validationError">
                    {errors.candidateId &&
                      touched.candidateId &&
                      errors.candidateId}
                  </span>
                </div>
                <div className="mb-3 row">
                  <div className="col-md-6">
                    <label className="form-label">Date</label>
                    <FormSelect
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="form-control"
                    >
                      <option value="">Select date</option>
                      {data?.responseData?.dates?.map((el, idx) => (
                        <option
                          key={idx}
                          value={el._id}
                          label={el.date.slice(0, 10)}
                        ></option>
                      ))}
                    </FormSelect>
                    <span className="validationError">
                      {errors.date && touched.date && errors.date}
                    </span>
                  </div>

                  {values.date && (
                    <div className="col-md-6">
                      <label className="form-label">Time</label>
                      <FormSelect
                        className="form-control"
                        value={values.selectedSlot}
                        name="selectedSlot"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option value="">Select time</option>
                        {data?.responseData?.dates
                          ?.filter((el) => el._id == values.date)[0]
                          ?.timeSlots?.map((slot, idx) => (
                            <option
                              disabled={
                                slot.status != "available" ? true : false
                              }
                              key={idx}
                              value={slot._id}
                              label={`${slot.startTime}-${slot.endTime} ${
                                slot.status == "available"
                                  ? "Available"
                                  : "Booked"
                              }`}
                            ></option>
                          ))}
                      </FormSelect>
                      <span className="validationError">
                        {errors.selectedSlot &&
                          touched.selectedSlot &&
                          errors.selectedSlot}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Link</label>
                  <input
                    className="form-control"
                    name="interviewLink"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.interviewLink}
                  />
                  <span className="validationError">
                    {errors.interviewLink &&
                      touched.interviewLink &&
                      errors.interviewLink}
                  </span>
                </div>
                <div className="mb-3">
                  <button
                    disabled={isSubmitting}
                    className="btn btn-primary"
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      <div className="mt-3">
        <label className="form=label">Job Description</label>

        <textarea
          className="form-control"
          value={data?.responseData?.jobDescription}
          disabled={true}
        />
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form=label">Employer</label>
          <input
            disabled={true}
            value={data?.responseData?.employerId?.name}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label className="form=label">Slots</label>
          {data?.responseData?.dates?.map((el, idx) => {
            return el?.timeSlots?.map((slot, ind) => (
              <input
                key={ind}
                disabled={true}
                className="form-control mb-2"
                value={`Date: ${el.date.slice(0, 10)}  Slot: ${
                  slot.startTime
                }-${slot.endTime}`}
              />
            ));
          })}
        </div>
      </div>

      <div className="mt-3 d-flex justify-content-end align-items-center">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Interview
        </button>
      </div>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Candidate</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              {
                candidate: "john",
                date: "22-20-2023",
                time: "12:00pm-03:00pm",
                status: "in-process",
              },
            ].map((el, idx) => {
              return (
                <tr>
                  <td>{idx + 1}</td>
                  <td>{el?.candidate}</td>
                  <td>{el?.date}</td>
                  <td>{el?.time}</td>
                  <td>{el?.status}</td>

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
                            handleDelete(el.id);
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

export default JobDetail;
