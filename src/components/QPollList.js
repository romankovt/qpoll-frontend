import React, { useState, useEffect } from "react";
import QPollCard from "./QPollCard.jsx";

export default function QPollList() {
  const [qPolls, setQPolls] = useState([]);

  useEffect(() => {
    getQpollList();
  }, []);

  function getQpollList() {
    fetch("http://localhost:4200/v1/polls")
      .then((response) => response.json())
      .then((data) => setQPolls(data));
  }

  function deleteQPoll(qPoll) {
    alert("Are you sure?");
    fetch(`http://localhost:4200/v1/polls/${qPoll.id}`, { method: "DELETE" })
      .then((response) => {
        console.log(response.json());
        getQpollList();
      })
      // .then((data) => navigate(`/qpolls/${data.id}`))
      .catch((error) => alert(`Error! ${JSON.stringify(error)}`));
  }

  return (
    <div className="q-poll-list">
      {qPolls.map((qPoll) => (
        <QPollCard key={qPoll.id} qPoll={qPoll} deleteQPoll={deleteQPoll} />
      ))}
    </div>
  );
}
