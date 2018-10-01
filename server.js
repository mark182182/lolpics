const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = 3002;

app.use(bodyParser.json());
app.use(cors());
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/giphy', (req, res) => {
  const keyword = req.query.keyword;
  const url = `http://api.giphy.com/v1/gifs/search?q=${keyword}
               &api_key=qy118vakMonOUZgmKYRX85Yjp9ilBZqK&limit=16`;
  res.json({
    url,
  })
});

const server = app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});

module.exports = { app, server };