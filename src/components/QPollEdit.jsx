import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import QPollEditForm from "../forms/QPollEditForm.jsx";
import QPoll from "../models/qpoll";

export default function QPollEdit() {
  let [qPoll, setQPoll] = useState({});
  const data = useLoaderData();

  useEffect(() => setQPoll(new QPoll(data)), [data]);

  if (Object.keys(qPoll).length === 0) {
    return;
  }

  return (
    <div className="q-poll">
      <h2 className="q-poll-heading">EDIT name: {qPoll.name}</h2>
      <h2 className="q-poll-heading">EDIT desc: {qPoll.description}</h2>
      <QPollEditForm
        qPoll={qPoll}
        updateQPoll={(updatedQPoll) => setQPoll(updatedQPoll)}
        method="PUT"
        submitURL={`http://localhost:4200/v1/polls/${qPoll.id}`}
      />
    </div>
  );
}
