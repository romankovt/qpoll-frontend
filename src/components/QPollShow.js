import React from "react";
import { useLoaderData, Link } from "react-router-dom";

export default function QPollShow() {
  let qPoll = useLoaderData();

  return (
    <div className="q-poll">
      <h2 className="q-poll-heading">{qPoll.name}</h2>
      <p>{qPoll.description}</p>
      <Link to={`/qpolls/${qPoll.id}/edit`}>Edit</Link>
    </div>
  );
}
