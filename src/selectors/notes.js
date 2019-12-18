// Get visible notes

export default (notes, { text }) => {
  return notes.filter(note => {
    let textMatch = [];
    return (textMatch = note.content
      .toLowerCase()
      .includes(text.toLowerCase()));
  });
};
