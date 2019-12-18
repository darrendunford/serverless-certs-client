import React from "react";

const Summary = props => {
  return (
    <div>
      <p>Displaying {props.notes.length} notes.</p>
    </div>
  );
};

export default Summary;
