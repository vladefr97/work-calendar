const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.port || 8080;
app.use(express.static('app'));
app.get('/', function (req, res) {
    res.sendfile('app/index.html')
});

app.listen(PORT, () => {
    console.log('server has been started!')
});

