// import notes json file
const notes = require('./db/db');

// import express package & instantiate server
const express = require('express');
const app = express();

//middleware
app.use(express.static('public'));

// import path module
const path = require('path');

// serve html file
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// serve notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// handle request for notes(db.json)
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// wildcard route redirects to homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// make server listen for requests
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
})