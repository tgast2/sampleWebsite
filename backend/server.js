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
    password: 'Aspen2019!',
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
app.get('/api/gamestats', (req, res) => {
    const query = `
        SELECT totalGames, userWins, computerWins
        FROM gamestats
        WHERE id = 1
    `;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Failed to fetch game statistics');
        } else {
            res.json(results[0]);
        }
    });
});




app.post('/api/start-game', (req, res) => {
    const { gameId } = req.body;
    const query = `
        INSERT INTO gamestats (gameId, totalGames, userWins, computerWins)
        VALUES (?, 0, 0, 0)
    `;
    db.query(query, [gameId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Failed to start new game');
        } else {
            res.send('New game started successfully');
        }
    });
});


// API to record a move
app.post('/api/gamemoves', (req, res) => {
    const { gameId, moveNumber, player, slot } = req.body;
    const query = 'INSERT INTO gamemoves (gameId, moveNumber, player, slot) VALUES (?, ?, ?, ?)';
    db.query(query, [gameId, moveNumber, player, slot], (err, results) => {
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
        UPDATE gamestats
        SET
            totalGames = totalGames + 1,
            userWins = userWins + ?,
            computerWins = computerWins + ?
        WHERE id = 1
    `;

    db.query(query, [user_won, computer_won], (err) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).send('Failed to update statistics');
        } else {
            res.send('Statistics updated successfully');
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});



