const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
  next();
});


app.use(express.static(path.join(__dirname, 'public')));
// Register the location for handlebars partials here:
hbs.registerPartials(__dirname + '/views/partials');
// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  // res.render('beers');
  
  punkAPI
    .getBeers()
    .then((beersFromApi) => {
      res.render('beers', {beersFromApi});
    })
    .catch(() => {
      
    })

});

app.get('/beers', (req, res) => {
  // res.render('beers');
  
  punkAPI
    .getBeers()
    .then((beersFromApi) => {
      res.render('beers', {beersFromApi});
    })
    .catch(() => {
      
    })

});

app.get('/random-beers', (req, res) => {
  // res.render('random-beers');
  punkAPI
    .getRandom()
    .then((beer) => {
      
      res.render('random-beers', {beer});
    })
    .catch(() => {

    });
});

// app.get('/beers/:id', (req, res) => {
//   let id = req.params.id
// console.log(id);
//   punkAPI
//     .getBeer(id)
//     .then(beersFromApi => {
//       res.render('beers/:id', { beersFromApi });
//     })
//     .catch(() => {});
// });

app.listen(3000, () => console.log('🏃‍ on port 3000'));
