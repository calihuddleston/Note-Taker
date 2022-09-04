//require helpers and router
const notes = require("express").Router();
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");
const uuid = require("../helpers/uuid");

//Get route to retrieve notes saved into database
notes.get("/", (req, res) =>
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)))
);

// Post route for new note created
notes.post("/", (req, res) => {
  const { title, text } = req.body;

  if (title && text) {
    const newNote = {
      title,
      text,
      note_id: uuid(),
    };

    readAndAppend(newNote, "./db/db.json");

    const response = {
      status: "success",
      body: newNote,
    };

    res.json(response);
  } else {
    res.json("Error in creating a new note");
  }
});

// will be attempting the bonus challenge and creating a delete http request

module.exports = notes;
