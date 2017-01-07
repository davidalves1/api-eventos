// BASE SETUP
// =============================================================================

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Evento = require('./server/models/eventos');

const app = express();

mongoose.connect('mongodb://user:user123@ds157078.mlab.com:57078/db-eventos');

// Configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set a port
const port = process.env.PORT || 5000;

// ROUTES FOR OUR API
// =============================================================================
// get an instance of the express Router
const router = express.Router();              

router.use((req, res, next) => {
	// Resolve the cross-origin problem
    res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	console.log(`method: ${req.method} | url: ${req.url}`);

	next();
});

router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname+'/server/views/index.html'));
});

// Routes from the API
router.route('/api/eventos')
    // create a evento
    .post(function(req, res) {
        
        let evento = new Evento;      // create a new instance of the evento model
        evento.date = req.body.date;  // set the eventos date (comes from the request)
        evento.description = req.body.description;  // set the eventos descríption (comes from the request)

        // save the evento and check for errors
        evento.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Registro adicionado com sucesso' });
        });
        
    })

    // get all the eventos
    .get(function(req, res) {
        Evento.find(function(err, eventos) {
            if (err)
                res.send(err);

            res.json(eventos);
        })
        .sort('-date description');
    });

router.route('/api/eventos/:evento_id')
    // get one evento
    .get(function(req, res){
        Evento.findById(req.params.evento_id, function(err, evento) {
            if (err)
                res.send(err);

            res.json(evento);
        });
    })
    // update a evento
    .put(function(req, res) {
        Evento.findById(req.params.evento_id, function(err, evento) {
            if (err)
                res.send(err);

            evento.date = req.body.date;
            evento.description = req.body.description;

            evento.save(function(err) {

                if (err)
                    res.send(err);

                res.json({message: 'Evento atualizado'});

            });
        });
    })
    // delete a evento
    .delete(function(req, res) {
        Evento.remove({
            _id: req.params.evento_id
        }, function(err, evento) {
            if (err)
                res.send(err);

            res.json({deleted: true, status: 200})
        })
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`Magic happens on port on localhost:${port}/api`);