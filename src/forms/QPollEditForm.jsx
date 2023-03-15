import React from "react";
import QPollQuestion from "./QPollQuestion.jsx";
import { useNavigate } from "react-router-dom";

export default function QPollEditForm({ qPoll, onInputChange, onAddQuestion, onAddOption, method, submitURL }) {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    fetch(submitURL, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: qPoll.name,
        description: qPoll.description
      })
    })
      .then((response) => response.json())
      .then((data) => navigate(`/qpolls/${data.id}`))
      .catch((error) => alert(`Error! ${JSON.stringify(error)}`));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" type="input" value={qPoll.name} onChange={onInputChange} />
      </label>
      <br />
      <label>
        Description:
        <input name="description" type="input" value={qPoll.description} onChange={onInputChange} />
      </label>
      <br />
      <section>
        {qPoll.questions.map((question) => (
          <div key={question.id} className="question-edit-box">
            <QPollQuestion question={question} onInputChange={onInputChange} onAddOption={onAddOption} />
          </div>
        ))}
      </section>
      <section>
        <button className="add-question" onClick={onAddQuestion}>
          ➕
        </button>
      </section>
      <input type="submit" value="SMASH!" />
    </form>
  );
}
