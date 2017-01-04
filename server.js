// BASE SETUP
// =============================================================================

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Missa = require('./server/models/Missas');

const app = express();

mongoose.connect('mongodb://user:user123@ds149998.mlab.com:49998/db-missas');

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
    res.json({ message: 'Bem vindo a API!' });   
});

// Routes from the API
router.route('/missas')
    // create a missa
    .post(function(req, res) {
        
        let missa = new Missa;      // create a new instance of the missa model
        missa.date = req.body.date;  // set the missas date (comes from the request)
        missa.description = req.body.description;  // set the missas descríption (comes from the request)

        // save the missa and check for errors
        missa.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Registro adicionado com sucesso' });
        });
        
    })

    // get all the missas
    .get(function(req, res) {
        Missa.find(function(err, missas) {
            if (err)
                res.send(err);

            res.json(missas);
        })
        .sort('-date description');
    });

router.route('/missas/:missa_id')
    // get one missa
    .get(function(req, res){
        Missa.findById(req.params.missa_id, function(err, missa) {
            if (err)
                res.send(err);

            res.json(missa);
        });
    })
    // update a missa
    .put(function(req, res) {
        Missa.findById(req.params.missa_id, function(err, missa) {
            if (err)
                res.send(err);

            missa.date = req.body.date;
            missa.description = req.body.description;

            missa.save(function(err) {

                if (err)
                    res.send(err);

                res.json({message: 'Tarefa atualizada'});

            });
        });
    })
    // delete a missa
    .delete(function(req, res) {
        Missa.remove({
            _id: req.params.missa_id
        }, function(err, missa) {
            if (err)
                res.send(err);

            res.json({deleted: true, status: 200})
        })
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`Magic happens on port on localhost:${port}/api`);