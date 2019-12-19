import React, { useRef, useState, useEffect } from "react";
import { API, Storage } from "aws-amplify";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { s3Upload } from "../libs/awsLib";
import config from "../config";
import "./Certs.css";
import loader from "../images/loader.gif";

export default function Certs(props) {
  const file = useRef(null);
  const [cert, setCert] = useState(null);
  const [certName, setCertName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pageloading, setPageLoading] = useState(true);

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadCert() {
      return API.get("certs", `/certs/${props.match.params.id}`);
    }

    async function onLoad() {
      try {
        const cert = await loadCert();
        const { certName, attachment } = cert;

        if (attachment) {
          cert.attachmentURL = await Storage.vault.get(attachment);
        }

        setCertName(certName);
        setCert(cert);
        setPageLoading(false);
      } catch (e) {
        alert(e);
      }
    }

    onLoad();
  }, [props.match.params.id]);

  function validateForm() {
    return certName.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function saveCert(cert) {
    return API.put("certs", `/certs/${props.match.params.id}`, {
      body: cert
    });
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE /
          1000000} MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      await saveCert({
        certName,
        attachment: attachment || cert.attachment
      });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function deleteCert() {
    return API.del("certs", `/certs/${props.match.params.id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this certification?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteCert();
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsDeleting(false);
    }
  }

  return (
    <div>
      {pageloading ? (
        <img className="center small-loader" src={loader} alt="Loader" />
      ) : (
        <div className="Certs">
          {cert && (
            <form onSubmit={handleSubmit}>
              <FormGroup controlId="certName">
                <ControlLabel>Certification Name</ControlLabel>
                <FormControl
                  value={certName}
                  type="text"
                  onChange={e => setCertName(e.target.value)}
                />
              </FormGroup>
              {cert.attachment && (
                <FormGroup>
                  <ControlLabel>Attachment</ControlLabel>
                  <FormControl.Static>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={cert.attachmentURL}
                    >
                      {formatFilename(cert.attachment)}
                    </a>
                  </FormControl.Static>
                </FormGroup>
              )}
              <FormGroup controlId="file">
                {!cert.attachment && <ControlLabel>Attachment</ControlLabel>}
                <FormControl onChange={handleFileChange} type="file" />
              </FormGroup>
              <LoaderButton
                block
                type="submit"
                bsSize="large"
                bsStyle="primary"
                isLoading={isLoading}
                disabled={!validateForm()}
              >
                Save
              </LoaderButton>
              <LoaderButton
                block
                bsSize="large"
                bsStyle="danger"
                onClick={handleDelete}
                isLoading={isDeleting}
              >
                Delete
              </LoaderButton>
            </form>
          )}
        </div>
      )}
    </div>
  );
}
