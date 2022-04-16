// import notes json file
const notes = require('./db/db');

// import express package & instantiate server
const express = require('express');
const app = express();

// port variable
const PORT = process.env.PORT || 3001;

//middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// import path module
const path = require('path');
// import fs library
const fs = require('fs');

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


// handle posts
app.post('/api/notes', (req,res) => {
    const { title, text } = req.body;
    

    if (title && text) {
        const newNote = {
            title,
            text,
        };

        fs.readFile('./db/db.json', 'utf8', (err,data) => {
            if (err) {
                console.error(err);
            } else {
                const parsedNotes = JSON.parse(data);
    
                parsedNotes.push(newNote);
    
                fs.writeFile(
                    './db/db.json',
                    JSON.stringify(parsedNotes, null, 2),
                    (writeErr) => 
                    writeErr
                    ? console.error(writeErr)
                    : console.info('Successfully updated notes!')
                );
            }   
        });

        const response = {
            status: 'success',
            body: newNote,
        };

        console.log(response);
        res.json(response);
     } else {
        res.json('Error in posting note');
    }    
});

// wildcard route redirects to homepage
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// make server listen for requests
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});