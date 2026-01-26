const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.get('/vivek', (req, res) => {
  res.send('Hello, vivek!');
});

app.get('/test', (req, res) => {
  res.send('Hello, test!');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});