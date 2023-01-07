const pg = require('pg');
const client = new pg.Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Igraduatedfrommunin2022',
    database: 'Portfolio2'
});
client.connect();

const express = require('express');
const app = express();

app.post('/api/users', (req, res) => {
    // Extract the user data from the request body
    const user = req.body;

    // Execute a database query to insert the user into the database
    client.query(
        'INSERT INTO users (name, email) VALUES ($1, $2)',
        [user.name, user.email],
        (err, result) => {
            if (err) throw err;

            res.send({ message: 'User added to the database' });
        }
    );
});

app.listen(3000, () => {
    console.log('API server listening on port 3000');
});

