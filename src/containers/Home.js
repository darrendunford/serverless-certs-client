import React, { useEffect, useState } from "react";
import "./Home.css";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Summary from "./Summary";
import NoteListFilter from "./NoteListFilter";
import loader from "../images/loader.gif";
import selectNotes from "../selectors/notes";
import { Link } from "react-router-dom";

export default function Home(props) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageloading, setPageLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const notes = await loadNotes();
        setNotes(notes);
      } catch (e) {
        alert(e);
      }

      setIsLoading(false);
      setPageLoading(false);
    }

    onLoad();
  }, [props.isAuthenticated]);

  function handleTextChange(text) {
    setFilter(text);
  }

  function loadNotes() {
    return API.get("notes", "/notes");
  }

  function renderNotesList(notes) {
    return [{}].concat(notes).map((note, i) =>
      i !== 0 ? (
        <LinkContainer key={note.noteId} to={`/notes/${note.noteId}`}>
          <ListGroupItem header={note.content.trim().split("\n")[0]}>
            {"Created: " + new Date(note.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/notes/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new note
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple note taking app</p>
        <div>
          <Link to="/login" className="btn btn-info btn-lg">
            Login
          </Link>
          <Link to="/signup" className="btn btn-success btn-lg">
            Signup
          </Link>
        </div>
      </div>
    );
  }

  function renderNotes() {
    return (
      <div className="notes">
        {pageloading ? (
          <img className="center small-loader" src={loader} alt="Loader" />
        ) : (
          <div>
            <PageHeader>Your Notes</PageHeader>
            <NoteListFilter filter={filter} onChange={handleTextChange} />
            <Summary notes={selectNotes(notes, { text: filter })} />
            <ListGroup>
              {!isLoading &&
                renderNotesList(selectNotes(notes, { text: filter }))}
            </ListGroup>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderNotes() : renderLander()}
    </div>
  );
}
