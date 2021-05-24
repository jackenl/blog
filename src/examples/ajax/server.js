const express = require('express');
const bodyParser = require('body-parser');

const port = process.PORT || 3000;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/api', (req, res) => {
  res.send('Hello world!');
});

app.post('/api/user', (req, res) => {
  res.send(JSON.stringify(req.body));
});

app.use(express.static(__dirname));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
