import React from "react";
import { useParams } from "react-router-dom";
import { useGetFeedBackByIdQuery } from "../../redux/api/user.api";
import { useSelector } from "react-redux";

const FeedbackDetails = () => {
  const token = useSelector((state) => state?.auth.token);
  const { id } = useParams();
  const showData = {
    id: id,
    token: token,
  };

  const { data, isLoading } = useGetFeedBackByIdQuery(showData);

  return (
    <div className="container py-5">
      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form-label">Candidate</label>
          <input
            className="form-control"
            disabled={true}
            value={data?.responseData?.candidateId?.name}
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Employer</label>
          <input
            className="form-control"
            disabled={true}
            value={data?.responseData?.employerId?.name}
          />
        </div>
      </div>
      <div className="mt-3">
        <label className="form-label">Job</label>
        <textarea
          disabled={true}
          rows={10}
          value={data?.responseData?.employerId?.jobDescription}
          className="form-control"
        />
      </div>

      <div className="mt-3">
        <h5>History</h5>
        <div className="card">
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                Candidate: {data?.responseData?.candidateId?.name}
              </div>
              <div className="col-md-4">
                Employer: {data?.responseData?.employerId?.name}
              </div>
              <div className="col-md-4">
                Job: {data?.responseData?.employerId?.jobDescription}
              </div>
            </div>
          </div>
        </div>

        {data?.responseData?.history?.map((historyItem, idx) => {
          return (
            <div key={idx} className="mt-3">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-4">Date: {historyItem.date}</div>
                    <div className="col-md-4">
                      Time: {historyItem.startTime} - {historyItem.endTime}
                    </div>
                    <div className="col-md-4">Status: {historyItem.status}</div>
                    <div className="col-md-12">
                      <label className="form-label">Remarks</label>
                      <textarea
                        disabled={true}
                        value={historyItem.remarks}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeedbackDetails;
