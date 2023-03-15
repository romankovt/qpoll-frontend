import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function QPollShow() {
  let qPoll = useLoaderData();
  const navigate = useNavigate();

  function deleteQPoll(qPoll) {
    alert("Are you sure?");
    fetch(`http://localhost:4200/v1/polls/${qPoll.id}`, { method: "DELETE" })
      .then(() => navigate("/"))
      .catch((error) => alert(`Error! ${JSON.stringify(error)}`));
  }

  return (
    <div className="q-poll">
      <h2 className="q-poll-heading">{qPoll.name}</h2>
      <p>{qPoll.description}</p>
      <h2>Question list:</h2>
      {qPoll.questions.map((question) => (
        <div key={question.id} className="q-poll-question">
          <p>
            <b>{question.title}</b>
          </p>
          {question.options.map((option) => {
            return (
              <div key={option.id} className="q-poll-options">
                <p>{option.title}</p>
              </div>
            );
          })}
        </div>
      ))}

      <Link to={`/qpolls/${qPoll.id}/edit`}>Edit | </Link>
      <button onClick={() => deleteQPoll(qPoll)}>Delete</button>
    </div>
  );
}
