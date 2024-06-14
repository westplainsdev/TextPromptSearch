const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const jsonFilePath = path.join(__dirname, 'output.json');

app.use(express.json());

app.get('/search/:term', (req, res) => {
  const searchTerm = req.params.term.toLowerCase();

  fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const jsonData = JSON.parse(data);
    const searchResults = jsonData.filter((item) => item.name.toLowerCase().includes(searchTerm));

    res.json(searchResults);
  });
});

const port = 3000; // Set the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
