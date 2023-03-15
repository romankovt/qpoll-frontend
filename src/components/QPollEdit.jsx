import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import QPollEditForm from "../forms/QPollEditForm.jsx";
import QPoll from "../models/qpoll";

export default function QPollEdit() {
  let [qPoll, setQPoll] = useState({});
  const data = useLoaderData();

  useEffect(() => {
    setQPoll(new QPoll(data));
  }, [data]);

  let onInputChangeHandler = (event, object) => {
    setQPoll((prevState) => {
      const updatedQPoll = JSON.parse(JSON.stringify(prevState));
      if (event.target.name === "questions[]") {
        let updatedQuestion = updatedQPoll.questions.find((question) => question.id == object.id);
        updatedQuestion.title = event.target.value;
      } else if (event.target.name === "options[]") {
        let foundOption;
        for (let i = 0; i < updatedQPoll.questions.length; i++) {
          foundOption = updatedQPoll.questions[i].options.find((option) => option.id == object.id);
          if (foundOption != undefined) {
            break;
          }
        }
        foundOption.title = event.target.value;
        return updatedQPoll;
      } else {
        updatedQPoll[event.target.name] = event.target.value;
        return updatedQPoll;
      }

      updatedQPoll[event.target.name] = event.target.value;
      return updatedQPoll;
    });
  };

  function addQuestionHandler(event) {
    event.preventDefault();
    const updatedQPoll = JSON.parse(JSON.stringify(qPoll));
    updatedQPoll.questions.push({
      id: crypto.randomUUID(),
      title: "",
      options: [{ id: crypto.randomUUID(), title: "" }]
    });
    setQPoll(updatedQPoll);
  }

  function onAddOptionHandler(event, question) {
    event.preventDefault();
    const updatedQPoll = JSON.parse(JSON.stringify(qPoll));
    let updatedQuestion = updatedQPoll.questions.find((q) => q.id === question.id);
    updatedQuestion.options.push({ id: crypto.randomUUID(), title: "" });
    setQPoll(updatedQPoll);
  }

  if (Object.keys(qPoll).length === 0) {
    return;
  }

  return (
    <div className="q-poll">
      <h2 className="q-poll-heading">EDIT name: {qPoll.name}</h2>
      <h2 className="q-poll-heading">EDIT desc: {qPoll.description}</h2>
      <QPollEditForm
        qPoll={qPoll}
        onInputChange={onInputChangeHandler}
        onAddQuestion={addQuestionHandler}
        onAddOption={onAddOptionHandler}
        method="PUT"
        submitURL={`http://localhost:4200/v1/polls/${qPoll.id}`}
      />
    </div>
  );
}
