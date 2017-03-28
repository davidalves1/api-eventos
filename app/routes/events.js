module.exports = app => {

	const Evento = app.app;

	// Routes from the API
	app.route('/api/eventos')
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
}