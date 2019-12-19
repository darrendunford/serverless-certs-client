import React from "react";

const Summary = props => {
  return (
    <div>
      <p>Displaying {props.certs.length} certifications.</p>
    </div>
  );
};

export default Summary;
