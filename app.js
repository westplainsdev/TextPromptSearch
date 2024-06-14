// Import necessary modules
const express = require('express');
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');

// Create an instance of the express application
const app = express();

// Set the path to the JSON file
const jsonFilePath = path.join(__dirname, 'output.json');

// Configure middleware for JSON parsing and URL-encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Configure Handlebars as the template engine
// Define a Handlebars helper for converting objects to JSON
const handlebars = exphbs.create({
    helpers: {
      json: function (context) {
        return JSON.stringify(context);
      }
    }
  });

// Set the view engine to Handlebars and specify the views directory
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Define a route for the root URL ("/")
app.get('/', (req, res) => {
  res.render('search', { pageTitle: 'Search Prompts'});
});

// Define a route for the "/search" URL
app.get('/search', (req, res) => {
  // Get the search term from the query string
  const searchTerm = req.query.term.toLowerCase();

  // Read the JSON file and parse it
  fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const jsonData = JSON.parse(data);
    // Filter the JSON data based on the search term
    // The following can be switched if you would like to search by file names rather than by prompt text.
    // const searchResults = jsonData.filter((item) => item.name.toLowerCase().includes(searchTerm));
    const searchResults = jsonData.filter((item) => item.prompt.toLowerCase().includes(searchTerm));

    res.render('search', { results: searchResults, pageTitle: 'Search Results' });
  });
});

const port = 3000; // Set the desired port number
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
