import React from "react";

export default function QPollQuestion({ question, onInputChange, onAddOption, onRemoveQuestion, onRemoveOption }) {
  return (
    <>
      <label htmlFor={question.id}>
        Question title:
        <button className="qpoll-remove-question" onClick={(e) => onRemoveQuestion(e, question)}>❌</button>
      </label>
      <input
        name="questions[]"
        id={question.id}
        type="input"
        value={question.title}
        onChange={(e) => {
          return onInputChange(e, question);
        }}
      />

      {question.options.map((option) => {
        return (
          <React.Fragment key={option.id}>
            <label htmlFor={option.id}>
              Option title: <button onClick={(e) => onRemoveOption(e, option)}>X</button>
            </label>
            <input name="options[]" id={option.id} value={option.title} onChange={(e) => onInputChange(e, option)} />
          </React.Fragment>
        );
      })}
      <button className="add-question" onClick={(e) => onAddOption(e, question)}>
        ➕
      </button>
    </>
  );
}
