// Get visible certs

export default (certs, { text }) => {
  return certs.filter(cert => {
    let textMatch = [];
    return (textMatch = cert.certName
      .toLowerCase()
      .includes(text.toLowerCase()));
  });
};
