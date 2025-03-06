const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware to set CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins for testing purposes
    // res.header('Access-Control-Allow-Origin', 'http://your-domain.com'); // Replace with your domain for production
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    next();
});

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/data.json', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'data.json'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});