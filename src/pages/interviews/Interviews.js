import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllInterviewsQuery } from "../../redux/api/interviews.api";

const Interviews = () => {
  const user = useSelector((state) => state.auth);
  const { data, isLoading } = useGetAllInterviewsQuery(user?.token);
  const navigate = useNavigate();
  const interviewsData = [
    {
      id: 1,
      candidate: "John Doe",
      employer: "Steve Smith",
      job: "Unity Developer",
      date: "12-10-2023",
      time: "5:00am-6:00am",
    },
  ];

  return (
    <div className="container py-5 py-sm-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Candidate</th>
            <th scope="col">Employer</th>
            <th scope="col">Job</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Action</th>

            {/* <th scope="col">Actions</th> */}
          </tr>
        </thead>
        <tbody>
          {interviewsData?.map((el, idx) => {
            return (
              <tr>
                <td>{idx + 1}</td>
                <td>{el?.candidate}</td>
                <td>{el?.employer}</td>
                <td>{el?.job}</td>
                <td>{el?.date}</td>
                <td>{el?.time}</td>

                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      //   setShowViewModal(true);
                      //   setSelectedJob(el);
                      navigate(`/interviews/${el.id}`);
                    }}
                  >
                    View Details
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Interviews;
