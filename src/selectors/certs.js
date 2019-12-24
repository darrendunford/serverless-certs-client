// Get visible certs

export default (certs, { text, searchBy }) => {
  return certs.filter(cert => {
    let textMatch = [];

    if (searchBy === "certName") {
      return (textMatch = cert.certName
        .toLowerCase()
        .includes(text.toLowerCase()));
    } else {
      return (textMatch = cert.vendor
        .toLowerCase()
        .includes(text.toLowerCase()));
    }
  });
};
