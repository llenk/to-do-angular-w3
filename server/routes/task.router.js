const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task.schema');

router.get('/', function (req, res) {
    Task.find({})
        .then((data) => {
            res.send(data);
        }).catch((error) => {
            res.sendStatus(500);
        });
});
router.post('/', function (req, res) {
    Task.create(req.body)
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});
router.put('/', function (req, res) {
    Task.findByIdAndUpdate(req.body._id, req.body)
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});
router.delete('/', function (req, res) {
    Task.findByIdAndRemove(req.query._id)
        .then(() => {
            res.sendStatus(200);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
});

module.exports = router;