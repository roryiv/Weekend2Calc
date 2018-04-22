const express = require('express');
const parser = require('body-parser');
const calculate = require('./modules/calculate');
const history = require('./modules/calc-history');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(parser.urlencoded({extended: true}));

let currentRequest;

app.post('/calculate', (req, res) => {
    currentRequest = req.body;
    history.push(currentRequest);
    res.sendStatus(200);
});

app.get('/solution', (req, res) => {
    res.send(calculate(currentRequest));
});

app.get('/history', (req, res) => {
    res.send(history);
});

app.delete('/history', (req, res) => {
    while (history.length > 0) {
        history.pop();
    }
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`listening on: ${PORT}`);
});