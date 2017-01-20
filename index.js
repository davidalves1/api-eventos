const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const Evento = require('./app/models/Eventos');
require('dotenv').config();

const app = express();

const url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds157078.mlab.com:57078/db-eventos`;
mongoose.connect(url);

// bodyParser() this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set a port              
const port = process.env.PORT || 5000;

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
    // create a event
    .post(function(req, res) {
        
        let evento = new Evento;      // create a new instance of the evento model
        evento.date = req.body.date;  // set the eventos date (comes from the request)
        evento.description = req.body.description;  // set the eventos descríption (comes from the request)

        // save the evento and check for errors
        evento.save(function(err) {
            if (err)
                res.json({status: 500, error: err});

            res.json({ message: 'Registro adicionado com sucesso' });
        });
        
    })

    // get all events
    .get(function(req, res) {
        Evento.find(function(err, eventos) {
            if (err)
                res.json({status: 500, error: err});

            res.json(eventos);
        })
        .sort('-date description');
    });

router.route('/api/eventos/:event_id')
    // get a event
    .get(function(req, res){
        Evento.findById(req.params.evento_id, function(err, evento) {
            if (err)
                res.json({status: 500, error: err});

            res.json(evento);
        });
    })

    // update a event
    .put(function(req, res) {
        Evento.findById(req.params.evento_id, function(err, evento) {
            if (err)
                res.json({status: 500, error: err});

            evento.date = req.body.date;
            evento.description = req.body.description;

            evento.save(function(err) {

                if (err)
                    res.json({status: 500, error: err});

                res.json({message: 'Evento atualizado', status: 200});

            });
        });
    })

    // delete a event
    .delete(function(req, res) {
        Evento.remove({
            _id: req.params.evento_id
        }, function(err, evento) {
            if (err)
                res.json({deleted: false, status: 500, error: err});

            res.json({deleted: true, status: 200})
        })
    });

router.get('/api/event/date/:date', function(req, res) {
    Evento.find({
        date: {$gte: req.params.date}
    },
    function(err, eventos) {
        if (err)
            res.json({status: 500, error: err});

        res.json(eventos);
    });
});

// all of our routes will be prefixed with /
app.use('/', router);

app.listen(port);
console.log(`Magic happens on port on localhost:${port}/api`);