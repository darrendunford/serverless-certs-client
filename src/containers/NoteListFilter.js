import React from "react";
import "./NoteListFilter.css";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";

const NoteListFilter = props => {
  function handleChange(e) {
    // Here, we invoke the callback with the new value
    props.onChange(e.target.value);
  }
  return (
    <div>
      <div class="content-container">
        <FormGroup
          bsSize="large"
          type="text"
          placeholder="Search notes"
          value={props.value}
          onChange={handleChange}
        >
          <ControlLabel>Search Notes</ControlLabel>
          <FormControl autoFocus />
        </FormGroup>
      </div>
    </div>
  );
};

export default NoteListFilter;
