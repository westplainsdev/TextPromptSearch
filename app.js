const express = require('express');
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();

const jsonFilePath = path.join(__dirname, 'output.json');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Configure Handlebars as the template engine
//set up a Handlebars helper
const handlebars = exphbs.create({
    helpers: {
      json: function (context) {
        return JSON.stringify(context);
      }
    }
  });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('search', { pageTitle: 'Search Prompts'});
});

app.get('/search', (req, res) => {
  const searchTerm = req.query.term.toLowerCase();

  fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const jsonData = JSON.parse(data);
    // const searchResults = jsonData.filter((item) => item.name.toLowerCase().includes(searchTerm));
    const searchResults = jsonData.filter((item) => item.prompt.toLowerCase().includes(searchTerm));

    res.render('search', { results: searchResults, pageTitle: 'Search Results' });
  });
});

const port = 3000; // Set the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
