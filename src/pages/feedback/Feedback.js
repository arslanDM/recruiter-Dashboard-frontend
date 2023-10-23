import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllFeedbackQuery } from "../../redux/api/user.api";
import { useSelector } from "react-redux";

const Feedback = () => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { data, isLoading } = useGetAllFeedbackQuery(user?.token);
  const feedbackData = [
    {
      id: 1,
      employer: "John doe",
      candidate: "Ali hassan",
      job: "Mern stack developer",
      time: "12:00pm-1:00pm",
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
            <th scope="col">Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {feedbackData?.map((el, idx) => {
            return (
              <tr>
                <td>{idx + 1}</td>
                <td>{el?.candidate}</td>
                <td>{el?.employer}</td>
                <td>{el?.job}</td>

                <td>{el?.time}</td>

                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      //   setShowViewModal(true);
                      //   setSelectedJob(el);
                      navigate(`/status-tracking/${el.id}`);
                    }}
                  >
                    View Feedback
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

export default Feedback;
