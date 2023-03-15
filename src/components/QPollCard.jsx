import React from "react";
import { Link } from "react-router-dom";

export default function QPollCard({ qPoll, deleteQPoll }) {
  return (
    <div className="q-poll-card">
      <div className="q-poll-card-header-wrapper">
        <h2 className="q-poll-heading">
          <Link to={`/qpolls/${qPoll.id}`}>{qPoll.name}</Link>
        </h2>
        <button onClick={() => deleteQPoll(qPoll)}>❌</button>
      </div>
      <p>{qPoll.description}</p>
    </div>
  );
}
