import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { toast } from "react-toastify";
import { FormSelect } from "react-bootstrap";
import { feedbackSchema } from "../../utills/validation/validationSchema";
import { useSelector } from "react-redux";

import {
  useGetAllFeedbackByIdQuery,
  useCreateFeedbackMutation,
} from "../../redux/api/auth.api";
import { useParams } from "react-router-dom";

const StatuTracking = () => {
  const [candidate11, setCandidate] = useState();
  const [employer, setEmployer] = useState();
  const [status, setStatus] = useState();
  const user = useSelector((state) => state.auth);
  const { id } = useParams();

  const { data, isLoading, refetch } = useGetAllFeedbackByIdQuery({
    id: id,
  });
  useEffect(() => {
    setCandidate(data?.responseData?.candidate?.name);
    setEmployer(data?.responseData?.employer?.name);
    setStatus(data?.responseData?.feedbackStatus?.feedback.status);
  }, [data, isLoading, candidate11]);
  console.log(isLoading, 123, data, candidate11);
  const [createFeedback] = useCreateFeedbackMutation();
  return (
    <div className="container-fluid py-5 d-flex justify-content-center align-items-center  ">
      <div className="card w-50 ">
        <div className="card-header">
          <h2>Feedback</h2>
        </div>
        <div>
          <Formik
            key={(candidate11, employer, status)}
            initialValues={{
              candidate: candidate11,
              employer: data?.responseData?.employer?.name,
              status: data?.responseData?.feedbackStatus?.feedback?.status,
              remarks: "",
              date: "",
              startTime: "",
              endTime: "",
              timeZone: "",
            }}
            validationSchema={feedbackSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              try {
                const payload = {
                  body: values,
                  id,
                };
                const data = await createFeedback(payload).unwrap();
                toast.success("Feedback added Successfully");
                refetch();
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
              <div className="card-body ">
                <form onSubmit={handleSubmit}>
                  <div className="text-capitalize">
                    <h3 className=" text-center"></h3>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Candidate</label>
                          <input
                            disabled={true}
                            type="text"
                            className="form-control"
                            placeholder="Enter name"
                            name="candidate"
                            value={values.candidate}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="col-md-6 mb-3">
                        <div className="mb-3">
                          <label className="form-label">Employer</label>
                          <input
                            disabled={true}
                            type="text"
                            className="form-control"
                            id="formGroupExampleInput"
                            placeholder="Enter name"
                            name="employer"
                            value={employer}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Status</label>
                          <FormSelect
                            disabled={
                              data?.responseData?.feedbackStatus?.feedback
                                ?.isSubmitted
                            }
                            id="formGroupExampleInput"
                            className="form-control"
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option
                              className="form-control"
                              value=""
                              label="Select status"
                            />
                            <option
                              className="form-control"
                              value={"in-process"}
                              label="In process"
                            />
                            <option
                              className="form-control"
                              value="reschedule"
                              label="Reschedule"
                            />
                            <option
                              className="form-control"
                              value="hire"
                              label="Hired"
                            />
                            <option
                              className="form-control"
                              value="rejected"
                              label="Rejected"
                            />
                          </FormSelect>
                          <span className="validationError">
                            {errors.status && touched.status && errors.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    {values.status == "reschedule" && (
                      <div className="mb-3">
                        <div className="row">
                          <div className="col-md-3">
                            <label className="form-label">Date</label>
                            <input
                              className="form-control"
                              type="date"
                              name="date"
                              value={values.date}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={
                                data?.responseData?.feedbackStatus?.feedback
                                  ?.isSubmitted
                              }
                            />
                            <span className="validationError">
                              {errors.date && touched.date && errors.date}
                            </span>
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Start Time</label>
                            <input
                              placeholder="Enter start time"
                              className="form-control"
                              type="text"
                              value={values.startTime}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              name="startTime"
                              disabled={
                                data?.responseData?.feedbackStatus?.feedback
                                  ?.isSubmitted
                              }
                            />
                            <span className="validationError">
                              {errors.startTime &&
                                touched.startTime &&
                                errors.startTime}
                            </span>
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">End Time</label>
                            <input
                              placeholder="Enter end time"
                              className="form-control"
                              type="text"
                              name="endTime"
                              value={values.endTime}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={
                                data?.responseData?.feedbackStatus?.feedback
                                  ?.isSubmitted
                              }
                            />
                            <span className="validationError">
                              {errors.endTime &&
                                touched.endTime &&
                                errors.endTime}
                            </span>
                          </div>
                          <div className="col-md-3">
                            <label className="form-label">Time Zone</label>
                            <input
                              placeholder="Enter time zone"
                              className="form-control"
                              type="text"
                              name="timeZone"
                              value={values.timeZone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              disabled={
                                data?.responseData?.feedbackStatus?.feedback
                                  ?.isSubmitted
                              }
                            />
                            <span className="validationError">
                              {errors.timeZone &&
                                touched.timeZone &&
                                errors.timeZone}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="mb-3">
                      <label className="form-label">Remarks</label>
                      <textarea
                        disabled={
                          data?.responseData?.feedbackStatus?.feedback
                            ?.isSubmitted
                        }
                        rows={10}
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput2"
                        placeholder="Enter remarks"
                        name="remarks"
                        value={values.remarks}
                        onBlur={handleBlur}
                        onChange={handleChange}
                      />
                      <span className="validationError">
                        {errors.remarks && touched.remarks && errors.remarks}
                      </span>
                    </div>

                    {data?.responseData?.feedbackStatus?.feedback
                      ?.isSubmitted ? null : (
                      <div className="d-flex justify-content-end align-items-center">
                        <button className="btn btn-primary w-25" type="submit">
                          Submit
                        </button>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default StatuTracking;
