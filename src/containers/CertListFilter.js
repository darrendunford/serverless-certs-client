import React from "react";
import "./CertListFilter.css";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const CertListFilter = props => {
  function handleChange(e) {
    // Here, we invoke the callback with the new value
    props.onChange(e.target.value);
  }
  return (
    <div>
      <div className="content-container">
        <FormGroup
          bsSize="large"
          type="text"
          placeholder="Search certifications"
          value={props.value}
          onChange={handleChange}
        >
          <ControlLabel>Search Certifications</ControlLabel>
          <FormControl autoFocus />
        </FormGroup>
      </div>
    </div>
  );
};

export default CertListFilter;
