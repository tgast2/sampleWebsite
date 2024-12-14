const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aspen2019!', // Use your MySQL root password
    database: 'tictactoe'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// API to fetch game statistics
app.get('/api/statistics', (req, res) => {
    const query = 'SELECT total_games, user_wins, computer_wins FROM game_statistics';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.json(results[0]);
        }
    });
});

// API to record a move
app.post('/api/move', (req, res) => {
    const { game_id, move_number, player, slot } = req.body;
    const query = 'INSERT INTO game_moves (game_id, move_number, player, slot) VALUES (?, ?, ?, ?)';
    db.query(query, [game_id, move_number, player, slot], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.send('Move recorded successfully');
        }
    });
});

// API to increment game statistics
app.post('/api/update-statistics', (req, res) => {
    const { user_won, computer_won } = req.body;
    const query = `
        UPDATE game_statistics
        SET 
            total_games = total_games + 1,
            user_wins = user_wins + ?,
            computer_wins = computer_wins + ?`;
    db.query(query, [user_won, computer_won], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Database error');
        } else {
            res.send('Statistics updated successfully');
        }
    });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
