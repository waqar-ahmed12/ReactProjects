import React from "react";

export default function Mode(props) {
  return (
    <div>
      <button className="button" onClick={props.change}>Change Background</button>
    </div>
  );
}
