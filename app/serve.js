const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('app'));
app.get('/', function (req, res) {
    res.sendfile('app/index.html')
});

app.listen(8080, () => {
    console.log('server has been started!')
});
