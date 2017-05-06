module.exports = (app, db) => {
	/**
	 * The Create resource method
	 * @param  '/api/events' The route to call this method
	 */
	app.post('/v1/events', (req, res) => {

		const date_time = req.body.date || undefined;
		const description = req.body.description || undefined;

		if (date_time === undefined || description === undefined)
			return res.status(422).json({error: 'Data e descrição são obrigatórias'});

		const event = {
			date: new Date(date_time),
			description: description
		};

		db.collection('eventos').insert(event, (err, result) => {
			if (err) {
				console.log(err);
				return res.status(500).json({error: `An error has occured.`});
			}
				
			return res.json({message: 'Evento adicionado com sucesso'});

		});
	});

	app.get('/v1/events/:date', (req, res) => {

		const date = req.params.date || undefined;

		if (date === undefined)
			return res.status(422).json({error: 'Nenhuma data foi informaada'});


		// Como podem ter eventos e diferentes horas do mesmo dia é definido o período: 0h do dia <= H < 0h do dia seguinte
		const start = new Date(date);
		let end = new Date(date);
		end.setDate(start.getDate() + 1);

		console.log(start, end)

		db.collection('eventos').find({'date': {$gte: start, $lt: end}})
			.toArray((err, events) => {
				if (err) {
					console.log(err);
					res.status(500).json({error: `An error has occured.`});
				}

				return res.send(events);

			});
	});

};