import React from "react";
import "./CertListFilter.css";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const CertListFilter = props => {
  function handleTextChange(e) {
    // Here, we invoke the callback with the new value
    props.onTextChange(e.target.value);
  }

  function handleSearchByChange(e) {
    // Here, we invoke the callback with the new value
    props.onSearchByChange(e.target.value);
  }

  return (
    <div>
      <div className="content-container">
        <FormGroup
          bsSize="large"
          type="text"
          placeholder="Search certifications by name"
          name="text"
          onChange={handleTextChange}
        >
          <ControlLabel>Search Certifications</ControlLabel>
          <FormControl autoFocus />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Search By</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="certName"
            onChange={handleSearchByChange}
            name="searchBy"
          >
            <option value="certName">Certification Name</option>
            <option value="vendor">Vendor</option>
          </FormControl>
        </FormGroup>
      </div>
    </div>
  );
};

export default CertListFilter;
