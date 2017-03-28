module.exports = app => {
	app.route('/api/eventos/:event_id')
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

	app.get('/api/event/date/:date', function(req, res) {
	    Evento.find({
	        date: {$gte: req.params.date}
	    },
	    function(err, eventos) {
	        if (err)
	            res.json({status: 500, error: err});

	        res.json(eventos);
	    });
	});
}