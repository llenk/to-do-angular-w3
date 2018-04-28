const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Task = require('./models/task.schema');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.static('server/public'));

app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`);
});

// Routes

app.get('/task', function (req, res) {
    Task.find({})
        .then((data) => {
            res.send(data);
        }).catch((error) => {
            res.sendStatus(500);
        });
});
app.post('/task', function (req, res) {
    Task.create(req.body)
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});
app.put('/task', function (req, res) {
    Task.findByIdAndUpdate(req.body._id, req.body)
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});
app.delete('/task', function (req, res) {
    Task.findByIdAndRemove(req.query._id)
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

// Connect to mongo
const databaseUrl = 'mongodb://localhost:27017/todo';
mongoose.connect(databaseUrl);
mongoose.connection.on('connected', () => {
    console.log(`mongoose connected to ${databaseUrl}`);
});
mongoose.connection.on('error', () => {
    console.log('mongoose connection error', error);
});