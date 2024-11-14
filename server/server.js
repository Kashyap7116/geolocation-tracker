const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Define a route for handling location data
app.post('/location', (req, res) => {
    const { ip, location, accuracy } = req.body;
    const folderPath = path.join(__dirname, ip);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    const filePath = path.join(folderPath, 'location_data.json');
    const data = {
        timestamp: new Date(),
        location,
        accuracy
    };

    fs.appendFileSync(filePath, JSON.stringify(data) + '\n');
    res.sendStatus(200);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
