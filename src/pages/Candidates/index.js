import { Formik } from "formik";
import React, { useState } from "react";
import { candidateSchema } from "../../utills/validation/validationSchema";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useCreateCandidateMutation,
  useGetAllCandidatesQuery,
} from "../../redux/api/user.api";

const Candidates = () => {
  const token = useSelector((state) => state?.auth.token);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [createCandidate] = useCreateCandidateMutation();
  const { data, refetch } = useGetAllCandidatesQuery(token);
  const [selectedData, setSelectedData] = useState({
    id: "",
    email: "",
    name: "",
    skillSet: "",
    phoneNumber: "",
    organization: "",
    jobTitle: "",
    experience: "",
    country: "",
    city: "",
    personalAddress: "",
    status: "",
    cv: "",
  });
  const candidates = [
    {
      id: 1,
      name: "John doe",
      email: "johndoe@gmail.com",
      phoneNumber: "1234567890",
      organization: "DigiMark developers",
      jobTitle: "CEO",
      experience: "4 years",
      status: "in-process",
      country: "USA",
      city: "New York",
      personalAddress: "New york heights hotel",
    },
  ];
  const handleClose = () => {
    setShowModal(false);
    setIsEdit(false);
    setSelectedData({
      id: "",
      email: "",
      name: "",
      skillSet: "",
      phoneNumber: "",
      organization: "",
      jobTitle: "",
      experience: "",
      country: "",
      city: "",
      personalAddress: "",
      status: "",
      cv: "",
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
            <Modal.Title>Add Candidate Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-12 col-lg-12 col-xl-12 p-4 p-sm-4">
                <div className="card p-3 p-sm-4 w-100">
                  <Formik
                    initialValues={{
                      email: isEdit ? selectedData.email : "",
                      name: selectedData?.name ? selectedData.name : "",
                      skillSet: isEdit ? selectedData.skillSet : "",
                      phoneNumber: isEdit ? selectedData.phoneNumber : "",
                      cv: isEdit ? selectedData.cv : "",
                      organization: isEdit ? selectedData.organization : "",
                      jobTitle: isEdit ? selectedData.jobTitle : "",
                      experience: isEdit ? selectedData.experience : "",
                      country: isEdit ? selectedData.country : "",
                      city: isEdit ? selectedData.city : "",
                      personalAddress: isEdit
                        ? selectedData.personalAddress
                        : "",
                      status: isEdit ? selectedData.status : "",
                    }}
                    validationSchema={candidateSchema}
                    onSubmit={async (values, { resetForm, setSubmitting }) => {
                      console.log(values);
                      try {
                        const payload = {
                          token: token,
                          body: values,
                        };
                        const data = await createCandidate(payload).unwrap();

                        toast.success("Candidate added successful");
                        setShowModal(false);
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
                                    Skill Set
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="formGroupExampleInput2"
                                    placeholder="Enter sill set"
                                    name="skillSet"
                                    value={values.skillSet}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <span className="validationError">
                                    {errors.skillSet &&
                                      touched.skillSet &&
                                      errors.skillSet}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div class="mb-3">
                                  <label
                                    for="formGroupExampleInput2"
                                    class="form-label"
                                  >
                                    Phone
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="formGroupExampleInput2"
                                    placeholder="Enter phone number"
                                    name="phoneNumber"
                                    value={values.phoneNumber}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    onKeyPress={(event) => {
                                      if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                      }
                                    }}
                                  />
                                  <span className="validationError">
                                    {errors.phoneNumber &&
                                      touched.phoneNumber &&
                                      errors.phoneNumber}
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
                                    Organization
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="formGroupExampleInput2"
                                    placeholder="Enter organization"
                                    name="organization"
                                    value={values.organization}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <span className="validationError">
                                    {errors.organization &&
                                      touched.organization &&
                                      errors.organization}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                {" "}
                                <div class="mb-3">
                                  <label
                                    for="formGroupExampleInput2"
                                    class="form-label"
                                  >
                                    Job Title
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="formGroupExampleInput2"
                                    placeholder="Enter job title"
                                    name="jobTitle"
                                    value={values.jobTitle}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <span className="validationError">
                                    {errors.jobTitle &&
                                      touched.jobTitle &&
                                      errors.jobTitle}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-md-6">
                                {" "}
                                <div class="mb-3">
                                  <label
                                    for="formGroupExampleInput2"
                                    class="form-label"
                                  >
                                    Experience{" "}
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="formGroupExampleInput2"
                                    placeholder="Enter experience"
                                    name="experience"
                                    value={values.experience}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <span className="validationError">
                                    {errors.experience &&
                                      touched.experience &&
                                      errors.experience}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                {" "}
                                <div class="mb-3">
                                  <label
                                    for="formGroupExampleInput2"
                                    class="form-label"
                                  >
                                    Country
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="formGroupExampleInput2"
                                    placeholder="Enter country"
                                    name="country"
                                    value={values.country}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <span className="validationError">
                                    {errors.country &&
                                      touched.country &&
                                      errors.country}
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
                                    City
                                  </label>
                                  <input
                                    type="text"
                                    class="form-control"
                                    id="formGroupExampleInput2"
                                    placeholder="Enter city"
                                    name="city"
                                    value={values.city}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                  />
                                  <span className="validationError">
                                    {errors.city && touched.city && errors.city}
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div class="mb-3">
                                  <label
                                    for="formGroupExampleInput2"
                                    class="form-label"
                                  >
                                    Status
                                  </label>

                                  <select
                                    name="status"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    class="form-control"
                                    defaultValue={values.status}
                                  >
                                    <option value="">Select Status</option>
                                    <option value="in-process">
                                      In process
                                    </option>
                                    <option value="reject">Reject</option>
                                    <option value="hie">Hire</option>
                                  </select>
                                  <span className="validationError">
                                    {errors.status &&
                                      touched.status &&
                                      errors.status}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div class="mb-3">
                              <label
                                for="formGroupExampleInput2"
                                class="form-label"
                              >
                                Personal Address
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="formGroupExampleInput2"
                                placeholder="Enter personal address"
                                name="personalAddress"
                                value={values.personalAddress}
                                onBlur={handleBlur}
                                onChange={handleChange}
                              />
                              <span className="validationError">
                                {errors.personalAddress &&
                                  touched.personalAddress &&
                                  errors.personalAddress}
                              </span>
                            </div>

                            <div class="mb-3">
                              <label
                                for="formGroupExampleInput"
                                class="form-label"
                              >
                                CV
                              </label>
                              <input
                                type="file"
                                class="form-control"
                                id="formGroupExampleInput"
                                name="cv"
                                value={values.cv}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                accept=".pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              />
                              <span className="validationError">
                                {errors.cv && touched.cv && errors.cv}
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
                                {isEdit ? "Update Candidate" : "Add Candidate"}
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
          Add Candidate
        </Button>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Organization</th>
              <th scope="col">Job Title</th>
              <th scope="col">Experience</th>
              <th scope="col">Status</th>
              {/* <th scope="col">Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {data?.responseData?.map((el, idx) => {
              return (
                <tr>
                  <td>{el?.id}</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.phoneNumber}</td>
                  <td>{el?.organization}</td>
                  <td>{el?.jobTitle}</td>
                  <td>{el?.experience}</td>
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

export default Candidates;
