import React from "react";
import { useParams } from "react-router-dom";
import { useGetInterviewByIdQuery } from "../../redux/api/interviews.api";
import { useSelector } from "react-redux";

const InterviewDetails = () => {
  const { id } = useParams();
  const user = useSelector((state) => state.auth);
  const { data, isLoading } = useGetInterviewByIdQuery({
    id: id,
    token: user?.token,
  });

  const interviewDate = {
    employer: "Reeza henricks",
    candidate: "SteveSmith",
    id: 1,
    job: "Mern stack interview for candidate",
    time: "12:00pm-10:00pm",
    date: "20-10-2023",
    link: "http://company.com",
  };
  return (
    <div className="container py-5">
      <h3>Interview Details</h3>
      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">Candidate</label>
          <input
            className="form-control"
            value={interviewDate?.candidate}
            disabled={true}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Employer</label>
          <input
            className="form-control"
            value={interviewDate?.employer}
            disabled={true}
          />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">Date</label>
          <input
            className="form-control"
            value={interviewDate?.date}
            disabled={true}
          />
        </div>
        <div className="col-md-6 ">
          <label className="form-label">Time</label>
          <input
            className="form-control"
            value={interviewDate?.time}
            disabled={true}
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="form-label">Job</label>
        <textarea
          className="form-control"
          value={interviewDate?.job}
          disabled={true}
          rows={10}
        />
      </div>
      <div className="mt-3">
        <label className="form-label">Link</label>
        <input
          className="form-control"
          value={interviewDate?.link}
          disabled={true}
        />
      </div>
    </div>
  );
};

export default InterviewDetails;
