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
      <p>Search Certification</p>
      <div className="content-container">
        <FormGroup
          type="text"
          placeholder="Search certifications by name"
          name="text"
          onChange={handleTextChange}
          className="input-group__item"
        >
          <FormControl autoFocus />
        </FormGroup>
        <FormGroup className="input-group__item">
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
