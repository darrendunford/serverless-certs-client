import React, { useEffect, useState } from "react";
import "./Home.css";
import { API } from "aws-amplify";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Summary from "./Summary";
import CertListFilter from "./CertListFilter";
import loader from "../images/loader.gif";
import selectCerts from "../selectors/certs";
import { Link } from "react-router-dom";

export default function Home(props) {
  const [certs, setCerts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageloading, setPageLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function onLoad() {
      if (!props.isAuthenticated) {
        return;
      }

      try {
        const certs = await loadCerts();
        setCerts(certs);
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

  function loadCerts() {
    return API.get("certs", "/certs");
  }

  function renderCertsList(certs) {
    return [{}].concat(certs).map((cert, i) =>
      i !== 0 ? (
        <LinkContainer key={cert.certId} to={`/certs/${cert.certId}`}>
          <ListGroupItem header={cert.certName.trim().split("\n")[0]}>
            {"Created: " + new Date(cert.createdAt).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/certs/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Add a new certification
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>SD&E Cloud Certifications Tracker</h1>
        <p>A cloud certications tracker app</p>
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

  function renderCerts() {
    return (
      <div className="certs">
        {pageloading ? (
          <img className="center small-loader" src={loader} alt="Loader" />
        ) : (
          <div>
            <PageHeader>Your Certifications</PageHeader>
            <CertListFilter filter={filter} onChange={handleTextChange} />
            <Summary certs={selectCerts(certs, { text: filter })} />
            <ListGroup>
              {!isLoading &&
                renderCertsList(selectCerts(certs, { text: filter }))}
            </ListGroup>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="Home">
      {props.isAuthenticated ? renderCerts() : renderLander()}
    </div>
  );
}
