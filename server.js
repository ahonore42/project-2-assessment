const express = require('express');
const methodOverride = require('method-override');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));
let db = require('./models')

// WRITE YOUR ROUTES HERE /////////////////////

app.get('/', (req, res) => {
    db.widget.findAll()
    .then((widgets) => {
        res.render('index', {widgets} )
    })
})

app.post('/', (req, res) => {
    db.widget.create({
      description: req.body.description,
      quantity: req.body.quantity,
    })
    .then(() => {
        res.redirect('/')
    })
    .catch((err) => {
      console.log('ERROR! DOES NOT COMPUTE!', err)
    })
  })

  app.delete('/:id', (req, res) => {
    db.widget.destroy({
      where: { id: req.params.id }
    })
    .then(() => {
        res.redirect('/')
    })
    .catch(err => {
      console.log('DELETE THE HUMAN, BRRRRRRR', err)
    })
  })

// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(3000);
