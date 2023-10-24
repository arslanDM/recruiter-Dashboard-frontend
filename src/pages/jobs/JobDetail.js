import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const JobDetail = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const token = useSelector((state) => state?.auth.token);
  const { id } = useParams();
  const timeData = [{ date: "2022-10-12", time: "12:00" }];

  return (
    <div className="container py-5">
      <div className="mt-3">
        <label className="form=label">Job Description</label>

        <textarea
          className="form-control"
          value={"akjsdflkjkdsaf"}
          disabled={true}
        />
      </div>

      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form=label">Employer</label>
          <input disabled={true} value="askjdflk" className="form-control" />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-6">
          <label className="form=label">Date</label>
          <select
            value={selectedDate}
            className="form-control"
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {["someDate"].map((el, idx) => {
              return (
                <option key={idx} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form=label">Date</label>
          <select
            value={selectedDate}
            className="form-control"
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {["someDate"].map((el, idx) => {
              return (
                <option key={idx} value={el}>
                  {el}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="mt-3"></div>
    </div>
  );
};

export default JobDetail;
