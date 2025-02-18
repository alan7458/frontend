const express = require('express');
const path = require('path');
const app = express();
const port = 3031;

// Serve all files in the client directory
app.use(express.static(path.join(__dirname, 'client')));

// Serve index.html by default
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});

app.listen(port, () => {
  console.log(`File server is running at http://localhost:${port}`);
});
