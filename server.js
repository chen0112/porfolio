require('dotenv').config();
const pg = require('pg');

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_NAME;

const client = new pg.Client({
    host,
    port,
    user,
    password,
    database
});


client.connect();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.post('/api/users', (req, res) => {
    // Extract the user data from the request body
    const user = req.body;

    // Execute a database query to insert the user into the database
    client.query(
        'INSERT INTO users (name, email, subject, messages) VALUES ($1, $2, $3, $4)',
        [user.name, user.email, user.subject, user.messages],
        (err, result) => {
            if (err) throw err;

            // Send a response with the user data
            res.send({
                // name: user.name,
                // email: user.email,
                // subject: user.subject,
                // messages: user.messages,
                message: 'Thank you for your messages'
            });
        }
    );
});

app.listen(3000, () => {
    console.log('API server listening on port 3000');
});

