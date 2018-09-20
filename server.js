const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(cors());
app.use('/assets', express.static('assets'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/giphy', (req, res) => {
  const url = `http://api.giphy.com/v1/gifs/search?q=lol&api_key=qy118vakMonOUZgmKYRX85Yjp9ilBZqK&limit=16`;
  res.json({
    url,
  })
});

app.listen(PORT, () => {
  console.log(`App is up and running on port ${PORT}`);
});