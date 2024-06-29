const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./DB/db');
const cors = require('cors'); // Import CORS middleware

const app = express();

// Connect Database
connectDB();

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));

// CORS Middleware
app.use(cors());

// Define Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/conferences', require('./routes/conferences'));
app.use('/api/feedback', require('./routes/feedback'));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
