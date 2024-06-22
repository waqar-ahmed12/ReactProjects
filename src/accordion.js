import React from 'react';

export default function Accordion(props) {
  return (
    <div className="accordion">
      <div className={`expanded${props.expanded ? ' expanded-active' : ''}`}>
        <button
          onClick={() => props.expand(props.id)}
          className={`accordion-button ${props.expanded ? 'button-expanded' : ''}`}
        >
          {props.question}
        </button>

        {props.expanded && (
          <div className="accordion-details">
            <div className="accordion-content">
              {props.content}
            </div>
            <div className="accordion-answer">
              {props.answer}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
