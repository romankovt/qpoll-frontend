import React, { useState } from "react";
import QPollEditForm from "../forms/QPollEditForm.jsx";
import QPoll from "../models/qpoll.js";

export default function QPollEdit() {
  const [qPoll, setQPoll] = useState(new QPoll());

  return (
    <div className="q-poll">
      <h2 className="q-poll-heading">Create name: {qPoll.name}</h2>
      <h2 className="q-poll-heading">Create desc: {qPoll.description}</h2>
      <QPollEditForm
        qPoll={qPoll}
        updateQPoll={(updatedQPoll) => setQPoll(updatedQPoll)}
        method="POST"
        submitURL={`http://localhost:4200/v1/polls/`}
      />
    </div>
  );
}
