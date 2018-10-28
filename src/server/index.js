const express = require('express');
const os = require('os');
const app = express();

app.use(express.static('dist'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");   
    next();
  });

app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));
app.listen(3000, () => console.log('Listening on port 3000!'));
