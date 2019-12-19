import React, { useRef, useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import "./NewCert.css";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";

export default function NewCert(props) {
  const file = useRef(null);
  const [certName, setCertName] = useState("");
  const [vendor, setVendor] = useState("");
  const [level, setLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateForm() {
    return certName.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  async function handleSubmit(event) {
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
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createCert({ certName, vendor, level, attachment });
      props.history.push("/");
    } catch (e) {
      alert(e);
      setIsLoading(false);
    }
  }

  function createCert(cert) {
    return API.post("certs", "/certs", {
      body: cert
    });
  }

  return (
    <div className="NewCert">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="vendor">
          <ControlLabel>Vendor</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="select"
            onChange={e => setVendor(e.target.value)}
          >
            <option value="AWS">AWS</option>
            <option value="GCP">GCP</option>
            <option value="Azure">Azure</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="level">
          <ControlLabel>Level</ControlLabel>
          <FormControl
            componentClass="select"
            placeholder="select"
            onChange={e => setLevel(e.target.value)}
          >
            <option value="Foundation">Foundation</option>
            <option value="Associate">Associate</option>
            <option value="Professional">Professional</option>
          </FormControl>
        </FormGroup>
        <FormGroup controlId="certName">
          <ControlLabel>Certification Name</ControlLabel>
          <FormControl
            value={certName}
            type="text"
            onChange={e => setCertName(e.target.value)}
          />
        </FormGroup>

        <FormGroup controlId="file">
          <ControlLabel>Attachment</ControlLabel>
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
          Create
        </LoaderButton>
      </form>
    </div>
  );
}
