import React from "react";
import QPollQuestion from "./QPollQuestion.jsx";
import { useNavigate } from "react-router-dom";

export default function QPollEditForm({ qPoll, updateQPoll, method, submitURL }) {
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    let { id: _id, ...qPollWithoudID } = qPoll;
    fetch(submitURL, {
      method: method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(qPollWithoudID)
    })
      .then((response) => response.json())
      .then((data) => navigate(`/qpolls/${data.id}`))
      .catch((error) => alert(`Error! ${JSON.stringify(error)}`));
  }

  function addQuestion(event) {
    event.preventDefault();
    const updatedQPoll = JSON.parse(JSON.stringify(qPoll));
    updatedQPoll.questions.push({
      id: crypto.randomUUID(),
      title: "",
      options: [{ id: crypto.randomUUID(), title: "" }]
    });
    updateQPoll(updatedQPoll);
  }

  function addOption(event, question) {
    event.preventDefault();
    const updatedQPoll = JSON.parse(JSON.stringify(qPoll));
    let updatedQuestion = updatedQPoll.questions.find((q) => q.id === question.id);
    updatedQuestion.options.push({ id: crypto.randomUUID(), title: "" });
    updateQPoll(updatedQPoll);
  }

  function removeQuestion(event, questionToDelete) {
    event.preventDefault();
    const updatedQPoll = JSON.parse(JSON.stringify(qPoll));
    updatedQPoll.questions = updatedQPoll.questions.filter((question) => question.id !== questionToDelete.id);
    updateQPoll(updatedQPoll);
  }

  function removeOption(event, optionToDelete) {
    event.preventDefault();
    const updatedQPoll = JSON.parse(JSON.stringify(qPoll));

    for (let i = 0; i < updatedQPoll.questions.length; i++) {
      updatedQPoll.questions[i].options = updatedQPoll.questions[i].options.filter((option) => {
        return option.id !== optionToDelete.id;
      });
    }

    updateQPoll(updatedQPoll);
  }

  let onInputChangeHandler = (event, object) => {
    updateQPoll((prevState) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input name="name" type="input" value={qPoll.name} onChange={onInputChangeHandler} />
      </label>
      <br />
      <label>
        Description:
        <input name="description" type="input" value={qPoll.description} onChange={onInputChangeHandler} />
      </label>
      <br />
      <section>
        {qPoll.questions.map((question) => (
          <div key={question.id} className="question-edit-box">
            <QPollQuestion
              question={question}
              onInputChange={onInputChangeHandler}
              onAddOption={addOption}
              onRemoveQuestion={removeQuestion}
              onRemoveOption={removeOption}
            />
          </div>
        ))}
      </section>
      <section>
        <button className="add-question" onClick={addQuestion}>
          ➕
        </button>
      </section>
      <input type="submit" value="SMASH!" />
    </form>
  );
}
