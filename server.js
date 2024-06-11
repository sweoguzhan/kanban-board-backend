// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const cardRoutes = require('./routes/cardRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const taskListRoutes = require('./routes/taskListRouter');
const boardRoutes = require('./routes/boardRoutes');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/card', cardRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/taskList', taskListRoutes);
app.use('/api/board',boardRoutes);


const PORT = process.env.PORT || 5001;

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });
