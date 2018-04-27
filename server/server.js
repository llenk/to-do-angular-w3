const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use(express.static('server/public'));

app.listen(PORT, function() {
    console.log(`listening on port ${PORT}`);
});